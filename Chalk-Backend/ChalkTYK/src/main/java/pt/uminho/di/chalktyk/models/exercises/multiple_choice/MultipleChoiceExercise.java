package pt.uminho.di.chalktyk.models.exercises.multiple_choice;

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonTypeName;
import io.hypersistence.utils.hibernate.type.json.JsonBinaryType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;
import pt.uminho.di.chalktyk.models.exercises.*;
import pt.uminho.di.chalktyk.models.exercises.fill_the_blanks.FillTheBlanksExercise;
import pt.uminho.di.chalktyk.models.exercises.items.Item;
import pt.uminho.di.chalktyk.services.exceptions.BadInputException;
import pt.uminho.di.chalktyk.services.exceptions.UnauthorizedException;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonTypeName("MC")
@DiscriminatorValue("MC")
public class MultipleChoiceExercise extends Exercise {
	@Column(name = "MCType")
	private Mctype mctype;

	@Type(JsonBinaryType.class)
	@Column(name = "items", columnDefinition = "jsonb")
	private Map<Integer, Item> items;

	@Override
	public void verifyResolutionProperties(ExerciseResolutionData exerciseResolutionData) throws BadInputException {
		if(!(exerciseResolutionData instanceof MultipleChoiceData multipleChoiceData))
			throw new BadInputException("Exercise resolution does not match exercise type (multiple choice).");
		// checks if the resolution answers to a subset of the items. Cannot have answers to not existent items.
		if(!items.keySet().containsAll(((MultipleChoiceData) exerciseResolutionData).getIds()))
			throw new BadInputException("Exercise resolution has items that do not refer to any question.");
		multipleChoiceData.verifyInsertProperties();
	}

	@Override
	public void verifyRubricProperties(ExerciseRubric rubric) throws BadInputException {
		if(!(rubric instanceof MultipleChoiceRubric multipleChoiceRubric))
			throw new BadInputException("Exercise rubric does not match exercise type (multiple choice).");
		// TODO - FUTURE WORK -> check if there is an openanswer rubric for each question that needs justification.
		if(multipleChoiceRubric.getMaxPointsSum()!=super.getPoints())
			throw new BadInputException("Exercise rubric maximum points (points*number of items) must be equals to exercise points");
		multipleChoiceRubric.verifyProperties();
	}

	@Override
	public String getExerciseType() {
		return "MC";
	}

	/**
	 * Evaluates the resolution of an exercise. Updates resolution status, points and resolution data.
	 *
	 * @param resolution resolution data that will be evaluated
	 * @param solution   solution of the exercise
	 * @param rubric     rubric of the exercise
	 * @return updated resolution
	 * @throws UnauthorizedException if the resolution cannot be evaluated automatically.
	 */
	@Override
	public ExerciseResolution automaticEvaluation(ExerciseResolution resolution, ExerciseSolution solution, ExerciseRubric rubric) throws UnauthorizedException {
		if(resolution == null || resolution.getData() == null)
			throw new UnauthorizedException("Cannot evaluate a null resolution.");

		if(solution == null)
			throw new UnauthorizedException("Cannot evaluate the resolution if the solution is null.");

		if(rubric == null)
			throw new UnauthorizedException("Cannot evaluate the resolution if the rubric is null");

		// casts objects to MultipleChoice...
		MultipleChoiceData resolutionData = (MultipleChoiceData) resolution.getData(),
				solutionData = (MultipleChoiceData) solution.getData();
		MultipleChoiceRubric mcRubric = (MultipleChoiceRubric) rubric;

		// only the variations that do not require
		// justification can be automatically corrected
		if(mctype != Mctype.MULTIPLE_CHOICE_NO_JUSTIFICATION
				&& mctype != Mctype.TRUE_FALSE_NO_JUSTIFICATION)
			throw new UnauthorizedException("Justifications cannot be corrected automatically.");

		float points = 0;

		for(Map.Entry<Integer, MultipleChoiceResolutionItem> entry : solutionData.getItems().entrySet()){
			Integer id = entry.getKey();
			MultipleChoiceResolutionItem solutionItem = entry.getValue();
			MultipleChoiceResolutionItem resolutionItem = resolutionData.getItemById(id);

			// if there is not a resolution item, then no answer was given by the student.
			// The student should not receive a penalty
			if(resolutionItem == null)
				resolutionData.putItem(id, new MultipleChoiceResolutionItem(0f, null, null));
				// else if the resolution value does not match the solution value, then
				// The student should receive a penalty
			else if(resolutionItem.getValue() != solutionItem.getValue()) {
				points -= mcRubric.getPenalty();
				resolutionItem.setPoints(-mcRubric.getPenalty());
			}
			// else the student's resolution value matches the solution value
			else{
				points += mcRubric.getChoicePoints();
				resolutionItem.setPoints(mcRubric.getChoicePoints());
			}
		}

		// update resolution fields
		resolution.setStatus(ExerciseResolutionStatus.REVISED);
		resolution.setPoints(points);

		return resolution;
	}

	@Override
	public void verifyInsertProperties() throws BadInputException {
		super.verifyInsertProperties();
		for (Map.Entry<Integer, Item> entry : items.entrySet()) {
			Item item = entry.getValue();
			if(item == null)
				throw new BadInputException("Multiple choice cannot have null items.");
			item.verifyProperties();
		}
	}

	@Override
	public Exercise cloneExerciseDataOnly()  {
		var exercise = new MultipleChoiceExercise();
		try { copyExerciseDataOnlyTo(exercise); }
		catch (BadInputException ignored){}
		return exercise;
	}

	@Override
	public void copyExerciseDataOnlyTo(Exercise exercise) throws BadInputException {
		if(!(exercise instanceof MultipleChoiceExercise mce))
			throw new BadInputException("Exercise is not of the same type.");
		_copyExerciseDataOnlyTo(mce);
		mce.mctype = mctype;
		mce.items = new HashMap<>();
		for(Map.Entry<Integer, Item> entry : items.entrySet())
			mce.items.put(entry.getKey(), entry.getValue().clone());
	}
}