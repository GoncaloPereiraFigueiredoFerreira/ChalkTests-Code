package pt.uminho.di.chalktyk.models.nonrelational.exercises.multiple_choice;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import pt.uminho.di.chalktyk.models.nonrelational.exercises.ExerciseRubric;
import pt.uminho.di.chalktyk.models.nonrelational.exercises.Item;
import pt.uminho.di.chalktyk.models.nonrelational.exercises.fill_the_blanks.FillTheBlanksRubric;
import pt.uminho.di.chalktyk.models.nonrelational.exercises.open_answer.OpenAnswerRubric;
import pt.uminho.di.chalktyk.services.exceptions.BadInputException;
import pt.uminho.di.chalktyk.services.exceptions.UnauthorizedException;

import java.util.*;

@Document(collection = "exercises_rubrics")
@JsonTypeName("MC")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MultipleChoiceRubric extends ExerciseRubric {
	private List<OpenAnswerRubric> justificationsRubrics;
	private Float choiceCotation;
	private Float penalty;

	@Override
	public void verifyProperties() throws BadInputException {
		if (penalty == null || choiceCotation == null || penalty < 0 || choiceCotation < 0)
			throw new BadInputException("Cannot create MultipleChoiceRubric: The cotation or penalty of a rubric cannot be null or negative.");
		if(justificationsRubrics!=null){
			for (OpenAnswerRubric openAnswerRubric:justificationsRubrics)
				openAnswerRubric.verifyProperties();
		}
	}

	public float getMaxCotationSum() {
		return choiceCotation*justificationsRubrics.size();
	}
}