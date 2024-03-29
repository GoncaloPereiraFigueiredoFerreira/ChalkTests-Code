package pt.uminho.di.chalktyk.models.exercises.open_answer;

import com.fasterxml.jackson.annotation.JsonTypeName;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.uminho.di.chalktyk.models.exercises.*;
import pt.uminho.di.chalktyk.services.exceptions.BadInputException;
import pt.uminho.di.chalktyk.services.exceptions.ForbiddenException;

@Entity
@NoArgsConstructor
@Getter
@Setter
@DiscriminatorValue("OA")
@JsonTypeName("OA")
public class OpenAnswerExercise extends Exercise {
	@Override
    public void verifyResolutionProperties(ExerciseResolutionData exerciseResolutionData) throws BadInputException {
        if(exerciseResolutionData == null || !exerciseResolutionData.getType().equals(this.getExerciseType()))
            throw new BadInputException("Exercise (re)solution does not match exercise type (open answer).");
        OpenAnswerData openAnswerData = (OpenAnswerData) exerciseResolutionData;
        openAnswerData.verifyInsertProperties();
    }

    @Override
    public void verifyRubricProperties(ExerciseRubric rubric) throws BadInputException {
        if(rubric == null || !rubric.getType().equals(this.getExerciseType()))
            throw new BadInputException("Exercise rubric does not match exercise type (open answer).");
        rubric.verifyProperties();
    }

    @Override
    public String getExerciseType() {
        return "OA";
    }

    @Override
    public boolean supportsCorrectionType(String evaluationType) {
        if(evaluationType == null) return false;
        evaluationType = evaluationType.toLowerCase();

        return switch (evaluationType) {
            case "ai" -> true;
            default -> false;
        };
    }

    /**
     * Evaluates the resolution of an exercise.
     *
     * @param resolution resolution data that will be evaluated
     * @param solution   solution of the exercise
     * @param rubric     rubric of the exercise
     * @return points to be attributed to the resolution
     * @throws ForbiddenException if the resolution cannot be evaluated automatically.
     */
    @Override
    public ExerciseResolution automaticEvaluation(ExerciseResolution resolution, ExerciseSolution solution, ExerciseRubric rubric) throws ForbiddenException {
        throw new ForbiddenException("Open answer exercise cannot be evaluated automatically.");
    }

    @Override
    public Exercise cloneExerciseDataOnly() {
        var exercise = new OpenAnswerExercise();
        try { copyExerciseDataOnlyTo(exercise); }
        catch (BadInputException ignored){}
        return exercise;
    }

    @Override
    public void copyExerciseDataOnlyTo(Exercise exercise) throws BadInputException {
        if(exercise == null || !exercise.getExerciseType().equals(this.getExerciseType()))
            throw new BadInputException("Exercise is not of the same type.");
        OpenAnswerExercise oae = (OpenAnswerExercise) exercise;
        _copyExerciseDataOnlyTo(oae);
    }
}