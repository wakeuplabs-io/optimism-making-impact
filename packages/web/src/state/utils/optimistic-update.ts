interface OptimisticUpdateParams<T> {
  getStateSlice: () => T;
  setStateSlice: (newState: T) => void;
  updateFn: (currentState: T) => T;
  apiCall: () => Promise<unknown>;
  onSuccess?: (apiResponse: unknown, newState: T) => void;
  onError?: (error: unknown, rollbackState: T) => void;
}

/**
 * Performs an optimistic update of the state by calling the updateFn function
 * and setting the new state immediately. The function then calls the apiCall
 * function and if it succeeds, the new state is confirmed. If the apiCall fails,
 * the state is rolled back to the original state and the onError handler is
 * triggered.
 *
 * @param getStateSlice - A function that returns the a slice of the current state
 * @param updateFn - A function that takes the slice of the current state and returns the new state slice
 * @param setStateSlice - A function that sets the new state
 * @param apiCall - The API call function
 * @param onSuccess - An optional function that is called if the API call succeeds
 * @param onError - An optional function that is called if the API call fails
 */
export async function optimisticUpdate<T>({
  getStateSlice,
  updateFn,
  setStateSlice,
  apiCall,
  onError,
  onSuccess,
}: OptimisticUpdateParams<T>) {
  const stateSlice = getStateSlice(); // Retrieve the current state slice
  const newStateSlice = updateFn(stateSlice); // Compute the new state based on the current state slice
  setStateSlice(newStateSlice); // Apply the optimistic update

  try {
    const response = await apiCall(); // Perform the API call
    onSuccess?.(response, newStateSlice);
  } catch (error) {
    setStateSlice(stateSlice); // Rollback to the original state if the API call fails
    onError?.(error, stateSlice);
    throw error; // Rethrow the error after the handler is triggered
  }
}
