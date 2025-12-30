import { Badge } from "@/components/ui/badge";

type VerifiedBadgeProps = {
  verified: boolean;
};

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  return (
    <Badge variant={verified ? "default" : "secondary"}>
      {verified ? "Verified" : "Unverified"}
    </Badge>
  );
}