import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { STYLE } from "~/lib/constants";

const DashCard = ({
  title,
  description,
  content,
  footer,
}: {
  title: string;
  description: string;
  content: ReactNode;
  footer?: string;
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className={STYLE.title}>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {typeof content === "string" ? <Text>{content}</Text> : content}
      </CardContent>
      {footer ? (
        <CardFooter>
          <Text>{footer}</Text>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default DashCard;
