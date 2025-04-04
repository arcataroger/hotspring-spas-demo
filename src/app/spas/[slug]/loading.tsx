import { LoadingIndicator } from "@/components/LoadingIndicator";
import {Container, Skeleton} from "@radix-ui/themes";

export default function Loading() {
  return (
    <>
      <LoadingIndicator message={"Loading spa..."} />
            <Skeleton width={"800"} height={"600px"}/>
    </>
  );
}
