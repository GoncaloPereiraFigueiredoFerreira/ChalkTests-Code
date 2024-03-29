package pt.uminho.di.chalktyk.apis;











import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import jakarta.servlet.http.HttpServletRequest;
import pt.uminho.di.chalktyk.models.subscriptions.Subscription;
import pt.uminho.di.chalktyk.models.subscriptions.SubscriptionPlan;

import java.io.IOException;
import java.util.List;

@RestController
public class SubscriptionsApiController implements SubscriptionsApi {

    public ResponseEntity<List<SubscriptionPlan>> subscriptionsGet(@NotNull @Parameter(in = ParameterIn.QUERY, description = "" ,required=true,schema=@Schema()) @Valid @RequestParam(value = "page", required = true) Integer page
, @NotNull @Min(1) @Max(50) @Parameter(in = ParameterIn.QUERY, description = "" ,required=true,schema=@Schema(allowableValues={ "1", "50" }, minimum="1", maximum="50"
)) @Valid @RequestParam(value = "itemsPerPage", required = true) Integer itemsPerPage
, @Parameter(in = ParameterIn.QUERY, description = "Finds the specialist subscription. " ,schema=@Schema()) @Valid @RequestParam(value = "specialistId", required = false) String specialistId
, @Parameter(in = ParameterIn.QUERY, description = "Finds the student subscription. " ,schema=@Schema()) @Valid @RequestParam(value = "studentId", required = false) String studentId
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<Void> subscriptionsInstitutionsInstitutionIdDelete(@Parameter(in = ParameterIn.PATH, description = "Institution identifier", required=true, schema=@Schema()) @PathVariable("institutionId") String institutionId
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<Subscription> subscriptionsInstitutionsInstitutionIdGet(@Parameter(in = ParameterIn.PATH, description = "Institution identifier", required=true, schema=@Schema()) @PathVariable("institutionId") String institutionId
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<Void> subscriptionsInstitutionsInstitutionIdPut(@Parameter(in = ParameterIn.PATH, description = "Institution identifier", required=true, schema=@Schema()) @PathVariable("institutionId") String institutionId
,@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody Subscription body
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<Void> subscriptionsInstitutionsPost(@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody Subscription body
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<Void> subscriptionsPost(@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody Subscription body
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<Void> subscriptionsSpecialistsPost(@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody Subscription body
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<Void> subscriptionsSpecialistsSpecialistIdDelete(@Parameter(in = ParameterIn.PATH, description = "Specialist identifier", required=true, schema=@Schema()) @PathVariable("specialistId") String specialistId
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<Subscription> subscriptionsSpecialistsSpecialistIdGet(@Parameter(in = ParameterIn.PATH, description = "Specialist identifier", required=true, schema=@Schema()) @PathVariable("specialistId") String specialistId
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<Void> subscriptionsSpecialistsSpecialistIdPut(@Parameter(in = ParameterIn.PATH, description = "Specialist identifier", required=true, schema=@Schema()) @PathVariable("specialistId") String specialistId
,@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody Subscription body
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<Void> subscriptionsStudentsPost(@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody Subscription body
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<Void> subscriptionsStudentsStudentIdDelete(@Parameter(in = ParameterIn.PATH, description = "Student identifier", required=true, schema=@Schema()) @PathVariable("studentId") String studentId
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<Subscription> subscriptionsStudentsStudentIdGet(@Parameter(in = ParameterIn.PATH, description = "Student identifier", required=true, schema=@Schema()) @PathVariable("studentId") String studentId
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<Void> subscriptionsStudentsStudentIdPut(@Parameter(in = ParameterIn.PATH, description = "Student identifier", required=true, schema=@Schema()) @PathVariable("studentId") String studentId
,@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody Subscription body
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<Void> subscriptionsSubscriptionPlanIdDelete(@Parameter(in = ParameterIn.PATH, description = "Subscription Plan identifier", required=true, schema=@Schema()) @PathVariable("subscriptionPlanId") String subscriptionPlanId
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<SubscriptionPlan> subscriptionsSubscriptionPlanIdGet(@Parameter(in = ParameterIn.PATH, description = "Subscription Plan identifier", required=true, schema=@Schema()) @PathVariable("subscriptionPlanId") String subscriptionPlanId
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

    public ResponseEntity<Void> subscriptionsSubscriptionPlanIdPut(@Parameter(in = ParameterIn.PATH, description = "Subscription Plan identifier", required=true, schema=@Schema()) @PathVariable("subscriptionPlanId") String subscriptionPlanId
,@Parameter(in = ParameterIn.DEFAULT, description = "", required=true, schema=@Schema()) @Valid @RequestBody SubscriptionPlan body
, @CookieValue("chalkauthtoken") String jwt) {
        throw new RuntimeException("Not implemented");
    }

}
