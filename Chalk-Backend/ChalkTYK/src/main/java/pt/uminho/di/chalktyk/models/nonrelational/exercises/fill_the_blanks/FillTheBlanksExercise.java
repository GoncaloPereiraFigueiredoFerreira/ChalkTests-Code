package pt.uminho.di.chalktyk.models.nonrelational.exercises.fill_the_blanks;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import pt.uminho.di.chalktyk.models.nonrelational.exercises.*;
import pt.uminho.di.chalktyk.models.nonrelational.exercises.multiple_choice.MultipleChoiceExercise;
import pt.uminho.di.chalktyk.models.nonrelational.exercises.multiple_choice.MultipleChoiceRubric;
import pt.uminho.di.chalktyk.services.exceptions.BadInputException;
import pt.uminho.di.chalktyk.services.exceptions.UnauthorizedException;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "exercises")
@JsonTypeName("FTB")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class FillTheBlanksExercise extends ConcreteExercise {
	private List<String> textSegments;
	@Override
	public void verifyResolutionProperties(ExerciseResolutionData exerciseResolutionData) throws BadInputException {
		if(!(exerciseResolutionData instanceof FillTheBlanksData fillTheBlanksData))
			throw new BadInputException("Exercise resolution does not match exercise type (fill the blanks).");
		if(numberOfAnswers()!=fillTheBlanksData.getFillings().size())
			throw new BadInputException("Exercise resolution fillings do not match exercise text segments (fillings size = (text segments size -1)).");
	}
	@Override
	public void verifyRubricProperties(ExerciseRubric rubric) throws BadInputException {
		if(!(rubric instanceof FillTheBlanksRubric fillTheBlanksRubric))
			throw new BadInputException("Exercise rubric does not match exercise type (fill the blanks).");

		if(numberOfAnswers()*fillTheBlanksRubric.getFillingCotation()!=super.getCotation())
			throw new BadInputException("Exercise rubric maximum cotation (fillingCotation * numberOfAnswers) must match the exercise cotation.");
		fillTheBlanksRubric.verifyProperties();
	}

	@Override
	public String getExerciseType() {
		return "FTB";
	}


	@Override
	public void verifyProperties() throws BadInputException {
		for (String textSegment:textSegments){
			if(textSegment==null)
				throw new BadInputException("The text segments cannot be null.");
		}
		super.verifyInsertProperties();
	}

	private int numberOfAnswers(){
		return textSegments.size()-1;
	}

}