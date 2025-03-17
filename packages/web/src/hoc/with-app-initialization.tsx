import { useRouterObserver } from '@/hooks/use-router-observer';
import { useSidebarStore } from '@/state/sidebar/sidebar-store';
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
    const { initializeObserver } = useRouterObserver();

    useEffect(() => {
      (async () => {
        await useSidebarStore.getState().init();
        initializeObserver();
      })();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AppInitializationWrapper;
}
