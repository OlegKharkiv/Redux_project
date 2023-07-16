import { useContext } from "react";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    MutedLink,
    SubmitButton
} from "./common";
import { Marginer } from "../marginer/index";
import { AccountContext } from "./accountContex";

export function SignupForm(props) {
    const { switchToSignin } = useContext(AccountContext);

    return (
        <BoxContainer>
            <FormContainer>
                <Input type="text" placeholder="Full name" />
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Input type="password" placeholder="Confirm Password" />
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <SubmitButton type="submit">Signin</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">
                Already have an account ?
                <BoldLink href="#" onClick={switchToSignin}>
                    Signup
                </BoldLink>
            </MutedLink>
        </BoxContainer>
    );
}