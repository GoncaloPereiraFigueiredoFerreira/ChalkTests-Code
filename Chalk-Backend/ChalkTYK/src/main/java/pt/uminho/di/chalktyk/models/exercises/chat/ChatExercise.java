package pt.uminho.di.chalktyk.models.exercises.chat;

import java.util.ArrayList;
import java.util.List;

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
import pt.uminho.di.chalktyk.models.exercises.Exercise;
import pt.uminho.di.chalktyk.models.exercises.ExerciseResolution;
import pt.uminho.di.chalktyk.models.exercises.ExerciseResolutionData;
import pt.uminho.di.chalktyk.models.exercises.ExerciseRubric;
import pt.uminho.di.chalktyk.models.exercises.ExerciseSolution;
import pt.uminho.di.chalktyk.services.exceptions.BadInputException;
import pt.uminho.di.chalktyk.services.exceptions.ForbiddenException;

/**
 * ChatExercise
 */
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonTypeName("CE")
@DiscriminatorValue("CE")
public class ChatExercise extends Exercise {
    @Type(JsonBinaryType.class)
    @Column(name = "Topics", columnDefinition = "jsonb")
    private List<String> topics;

    @Override
    public boolean supportsCorrectionType(String evaluationType) {
        return "ai".equalsIgnoreCase(evaluationType);
    }

    @Override
    public ExerciseResolution automaticEvaluation(ExerciseResolution resolution, ExerciseSolution solution, ExerciseRubric rubric) throws ForbiddenException {
        throw new ForbiddenException("Chat exercise cannot be evaluated automatically.");
    }

    @Override
    public void verifyResolutionProperties(ExerciseResolutionData exerciseResolutionData) throws BadInputException {
        if(exerciseResolutionData == null || !exerciseResolutionData.getType().equals(this.getExerciseType())) {
            throw new BadInputException("Exercise (re)solution does not match exercise type (chat exercise)");
        }
        ChatExerciseData chatExerciseData = (ChatExerciseData) exerciseResolutionData;
        chatExerciseData.verifyInsertProperties();
    }

    @Override
    public void verifyRubricProperties(ExerciseRubric rubric) throws BadInputException {
        if(rubric == null || !rubric.getType().equals(this.getExerciseType()))
            throw new BadInputException("Exercise rubric does not match exercise type (chat exercise)");
        rubric.verifyProperties();
    }

    @Override
    public void copyExerciseDataOnlyTo(Exercise exercise) throws BadInputException {
        if(exercise == null || !exercise.getExerciseType().equals(this.getExerciseType()))
			throw new BadInputException("Exercise is not of the same type.");
		ChatExercise chatExercise = (ChatExercise) exercise;
        _copyExerciseDataOnlyTo(chatExercise);
        chatExercise.topics = topics != null ? new ArrayList<>(topics) : null;
    }

    @Override
    public Exercise cloneExerciseDataOnly() {
        var exercise = new ChatExercise();
        try{ copyExerciseDataOnlyTo(exercise);}
        catch (BadInputException ignored){}
        return exercise;
    }

    @Override
    public String getExerciseType() {
        return "CE";
    }
}
