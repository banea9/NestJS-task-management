import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auto-credentials.dto';
import { AuthService } from './auth.service';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post("/signup")
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) : Promise<void> {
        return this.authService.signUp(authCredentialsDto)
    }
    @Post("/signin")
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) : Promise<{accessToken : string}> {
        return this.authService.signIn(authCredentialsDto)
    }


}


//JWT (JSON Web Tokens) -> usable for authorization or secure exchange of informatio between parties, verify that the sender is who he claims to be. It is signed by issuer, using a secret or keypair. Structure: Header -> contains metadata about the token (type, hashing algorithm). Payload -> contains claims (statements about the entity - for example user) and additional data. Signature -> is the result of the encoded header, the encoded payload, signed against a secret. Practical exammple: User John Doe signs into our app. We want to create a token with which John can authorize for a while. We create a payload containing the username and role. We then sign the token with an expiry time of 1 hour. We use a secret for signing. John Doe sends a request to our API. He wants to delete a task. In the request headers, we can find a JWT token. To validate his token, we take the headers and payload, and re-generate the signature using our secret. We then compare the result signature with the signature in this token. Important about JWT: JWT can be decoded by anyone. They should not contain sensitive information such as passwords. It is useful for front-end application to use JWT tokens to toggle features conditionally. For example, if the user is admin we could show or hide button based on the claims in the token. JWT should ideally be short-lived.