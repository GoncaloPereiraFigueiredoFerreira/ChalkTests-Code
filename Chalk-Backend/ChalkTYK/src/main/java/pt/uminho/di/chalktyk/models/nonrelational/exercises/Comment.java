package pt.uminho.di.chalktyk.models.nonrelational.exercises;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
	private List<Item> items;

	/**
	 * Adds item to the list.
	 * @param item comment item
	 */
	public void addItem(Item item){
		if(item != null){
			if(items == null)
				items = new ArrayList<>();
			items.add(item);
		}
	}

	/**
	 * Checks if the comment is properly formed.
	 * @return 'null' if the comment is properly formed.
	 * 			Or a string specifying the error.
	 */
	public String verifyComment(){
		if (items == null || items.isEmpty())
			return "Comment is null or empty.";
		return null;
	}
}