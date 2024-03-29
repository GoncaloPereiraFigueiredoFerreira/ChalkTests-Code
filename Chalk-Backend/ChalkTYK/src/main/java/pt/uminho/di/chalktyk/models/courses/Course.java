package pt.uminho.di.chalktyk.models.courses;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.uminho.di.chalktyk.models.institutions.Institution;
import pt.uminho.di.chalktyk.models.users.Specialist;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Course")
public class Course {
	@Id
	@Column(name="ID")
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@Column(name="Name", nullable=false, length=255)
	private String name;
	
	@Column(name="Description", nullable=true, length=1000)
	private String description;

	@Column(name = "OwnerId", nullable = false)
	private String ownerId; // id of the specialist that is the owner of the course

	@JsonIgnore
	@ManyToMany(targetEntity= Specialist.class, fetch = FetchType.LAZY)
	@JoinTable(name="Specialist_Course", joinColumns={ @JoinColumn(name="CourseID") }, inverseJoinColumns={ @JoinColumn(name="SpecialistID") })
	private Set<Specialist> specialists;
	
	@ManyToOne(targetEntity= Institution.class, fetch=FetchType.LAZY)
	@JoinColumn(name="InstitutionID", referencedColumnName="ID")
	private Institution institution;

	/**
	 * Creates a course with id, where the rest of the parameters are null.
	 */
	public Course(String id){
		this.id=id;
	}

	public Course(String id, String name, String description, String ownerId, Set<Specialist> specialists) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.ownerId = ownerId;
		this.specialists = specialists;
	}

	public void addSpecialist(Specialist s){
		if(specialists == null)
			specialists = new HashSet<>();
		specialists.add(s);
	}

	public Course clone() {
		Course duplicatedCourse = new Course();
		duplicatedCourse.setName(this.name);
		duplicatedCourse.setDescription(this.description);
		duplicatedCourse.setOwnerId(this.ownerId);
		duplicatedCourse.setInstitution(this.institution != null ? this.institution.clone() : null);

		// Duplicate specialists if present
		if (this.specialists != null) {
            Set<Specialist> duplicatedSpecialists = this.specialists.stream().map(Specialist::clone).collect(Collectors.toSet());
			duplicatedCourse.setSpecialists(duplicatedSpecialists);
		}

		return duplicatedCourse;
	}

	@JsonIgnore
	public String getInstitutionId(){
		if(institution == null)
			return null;
		else
			return institution.getName();
	}
}