import { Redirect, useRootNavigationState } from "expo-router";

const StartApp = () => {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  return (
    <Redirect href="/presentation" />
  );
};

export default StartApp;
