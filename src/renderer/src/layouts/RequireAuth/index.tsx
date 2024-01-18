import Permission from "../../pages/ErrorPage/401";

export function decodeToken(token: any) {
  // Split the token into three parts
  const Array = token.split(".");
  const payload = Array[1];

  // Base64 decode the payload section
  const decodedPayload = atob(payload);

  // Parse the decoded payload into a JavaScript object
  return JSON.parse(decodedPayload);
}

const RequireAuth = ({ children }: { children: any }) => {
  //const { accessToken } = useBoundStore((state) => state);

  const accessToken = localStorage.getItem("accessToken");

  // Decode token
  if (!accessToken) {
    return <Permission />;
  }
  const decodedToken = accessToken ? decodeToken(accessToken) : null;

  if (!decodedToken) {
    return <Permission />;
  }
  const currentTimestamp = Math.floor(Date.now() / 1000);

  return decodedToken.exp > currentTimestamp ? <>{children}</> : <Permission />;
};

export default RequireAuth;
