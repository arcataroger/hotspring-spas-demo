import {Container} from "@radix-ui/themes";

type LoadingIndicatorTypes = {
    message?: string
}

export const LoadingIndicator = (props:LoadingIndicatorTypes) => {

    const {message} = props;

    return <Container size={"3"}>
        <p>{message ?? 'Loading, please wait...'}</p>
    </Container>
}