
package pt.uminho.di.chalktyk.apis;

import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import pt.uminho.di.chalktyk.dtos.UserUpdateDTO;
import pt.uminho.di.chalktyk.models.users.InstitutionManager;
import pt.uminho.di.chalktyk.models.users.Specialist;
import pt.uminho.di.chalktyk.models.users.Student;
import pt.uminho.di.chalktyk.models.users.User;

@Validated
public interface UsersApi {

    /**
     * Allows updating the basic information of a user. 'null' fields can be given, but a bad input exception will be thrown if the field does not allow a 'null' value.
     * @param userDTO all user properties to be updated
     */
    @Operation(summary = "Update user", description = "Update an existent user in the store", tags={ "user" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "successful operation"),
        @ApiResponse(responseCode = "400", description = "Invalid properties"),
        @ApiResponse(responseCode = "401", description = "Unauthorized operation"),
        @ApiResponse(responseCode = "404", description = "User not found") })
    @RequestMapping(value = "",
        consumes = { "application/json" }, 
        method = RequestMethod.PUT)
    ResponseEntity<Void> updateBasicProperties(
            @CookieValue(name = "chalkauthtoken") String authToken,
            @RequestBody UserUpdateDTO userDTO);

    @Operation(summary = "Get user by user id", description = "", tags={ "user" })
    @ApiResponses(value = { 
        @ApiResponse(responseCode = "200", description = "successful operation",
                content = @Content(mediaType = "application/json",
                        schema = @Schema(oneOf = {Student.class, Specialist.class, InstitutionManager.class}))),
        @ApiResponse(responseCode = "401", description = "Unauthorized operation"),
        @ApiResponse(responseCode = "404", description = "User not found") })
    @RequestMapping(value = "/{userId}",
        produces = { "application/json" }, 
        method = RequestMethod.GET)
    ResponseEntity<User> getUserById(
            @CookieValue(name = "chalkauthtoken") String authToken,
            @Parameter(in = ParameterIn.PATH, name = "userId") @PathVariable(value = "userId") String userId);

    @Operation(summary = "Login user", description = "", tags={ "user" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(oneOf = {Student.class, Specialist.class, InstitutionManager.class}))),
            @ApiResponse(responseCode = "401", description = "Unauthorized operation.")})
    @RequestMapping(value = "/login",
            produces = { "application/json" },
            method = RequestMethod.POST)
    ResponseEntity<User> login( @CookieValue(name = "chalkauthtoken") String authToken);

    @Operation(summary = "Logout user", description = "", tags={ "user" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation"),
            @ApiResponse(responseCode = "401", description = "Unauthorized operation.")})
    @RequestMapping(value = "/logout",
            produces = { "application/json" },
            method = RequestMethod.POST)
    ResponseEntity<Void> logout(@CookieValue(name = "chalkauthtoken") String authToken);
}

