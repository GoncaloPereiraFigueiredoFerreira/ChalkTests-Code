package pt.uminho.di.chalktyk.models.nonrelational.exercises;

import lombok.AllArgsConstructor;
import lombok.Getter;
import pt.uminho.di.chalktyk.services.exceptions.BadInputException;
import pt.uminho.di.chalktyk.services.exceptions.UnauthorizedException;

@AllArgsConstructor
@Getter
public class ExerciseStatement {
	private String text;
	private String imagePath;
	private String imagePosition;

	public void verifyProperties() throws BadInputException {
		if(text == null)
			throw new BadInputException("Cannot create exercise statement: text cannot be null.");
		if(imagePath == null)
			throw new BadInputException("Cannot create exercise statement: imagePath cannot be null.");
		if(imagePosition == null)
			throw new BadInputException("Cannot create exercise statement: imagePosition cannot be null.");
	}

	/**
	 * Updates a statement. If an object is 'null' than it is considered that it should remain the same.
	 * @param exerciseStatement     new exercise statment
	 */
	public boolean updateStatement(ExerciseStatement exerciseStatement) {
		boolean updated=false;
		if(exerciseStatement.getText()!=null){
			this.text= exerciseStatement.getText();
			updated=true;
		}
		if(exerciseStatement.getImagePath()!=null){
			this.imagePath= exerciseStatement.getImagePath();
			updated=true;
		}
		if(exerciseStatement.getImagePosition()!=null){
			this.imagePath=exerciseStatement.getImagePosition();
			updated=true;
		}
		return updated;
	}
}