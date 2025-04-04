import { LoadingIndicator } from "@/components/LoadingIndicator";
import {Container, Skeleton} from "@radix-ui/themes";

export default function Loading() {
  return (
    <>
      <LoadingIndicator message={"Loading energy calculator..."} />
        <Container size={"3"}>
            <Skeleton width={"400px"} height={"200px"}/>
        </Container>
    </>
  );
}
