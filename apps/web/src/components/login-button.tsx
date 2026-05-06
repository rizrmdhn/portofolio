import { authMeQueryOptions } from "@/utils/auth-query";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export function LoginButton() {
  const { data, isLoading } = useQuery(authMeQueryOptions());

  const navigate = useNavigate();

  if (isLoading) {
    return <Skeleton className="h-8 w-16 rounded" />;
  }

  if (data) {
    return (
      <Button
        onClick={() =>
          navigate({
            to: "/dashboard",
          })
        }
        variant="outline"
        size="lg"
        className="text-subtle"
      >
        Dashboard
      </Button>
    );
  }

  return (
    <Button
      onClick={() =>
        navigate({
          to: "/login",
        })
      }
      variant="outline"
      size="lg"
      className="text-subtle"
    >
      Login
    </Button>
  );
}
