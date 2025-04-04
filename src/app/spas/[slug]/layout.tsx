import {Container} from "@radix-ui/themes";

export default function SpaLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <Container size={"4"}>
            {children}
        </Container>
    </>
}