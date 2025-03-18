import { ComponentType, FC, useEffect } from 'react';

/**
 * HOC that wraps a component with app initialization logic.
 *
 * This ensures that the app is properly initialized before the component is rendered.
 * @param WrappedComponent The component to wrap.
 * @returns The wrapped component.
 */
export function withAppInitialization<P extends JSX.IntrinsicAttributes>(WrappedComponent: ComponentType<P>): FC<P> {
  const AppInitializationWrapper: FC<P> = (props: P) => {
    useEffect(() => {
      (async () => {
        // TODO: Implement app initialization logic, maybe ?
        // 1. Check if the user is authenticated ?
        // 2. Pre-Fetch the user's rounds ?
      })();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AppInitializationWrapper;
}
