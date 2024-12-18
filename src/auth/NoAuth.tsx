import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getSession } from "./Auth";

const NoAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const ComponentWithAuth: React.FC<P> = (props) => {
        const router = useRouter();
    
        useEffect(() => {
          const session = getSession();
          const isAuthenticated = !!session
          if (isAuthenticated) {
            router.push("/pages/login");
          }
        }, [router]);
    
        return <WrappedComponent {...props} />;
      };
    
      return ComponentWithAuth;
}

export default NoAuth