package pt.uminho.di.chalktyk.models.users;

import java.util.regex.Pattern;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class User {
	@Column(name="ID")
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@Column(name="Name")
	private String name;

	@Column(name="PhotoPath")
	private String photoPath;

	@Column(name="Email", unique = true)
	private String email;

	@Column(name="Description")
	private String description;

	/**
	 * Checks basic user properties.
	 * @return 'null' if all properties are valid, or a string mentioning the criteria that was not passed.
	 */
	public String checkInsertProperties(){
		if(name == null || name.isEmpty())
			return "Not a valid name.";

		String regexPattern = "^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,}$";
		boolean validEmail = Pattern.compile(regexPattern)
									.matcher(this.email)
									.matches();
		if (!validEmail)
			return "Not a valid email format.";

        return null;
    }

	/**
	 * Check if the subscription is valid.
	 * @return 'null' if the subscription is valid, or a string mentioning the error.
	 */
	protected abstract String checkSubscription();

	@Override
	public String toString() {
		return "User{" +
				", name='" + name + '\'' +
				", photoPath='" + photoPath + '\'' +
				", email='" + email + '\'' +
				", description='" + description + '\'' +
				//", subscription=" + subscription +
				'}';
	}
}