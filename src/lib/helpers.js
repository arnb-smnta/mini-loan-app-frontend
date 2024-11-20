export const isBrowser = typeof window !== "undefined";
export class LocalStorage {
  // Get a value from local storage by key
  static get(key) {
    if (!isBrowser) return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  // Set a value in local storage by key
  static set(key, value) {
    if (!isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Remove a value from local storage by key
  static remove(key) {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  static clear() {
    if (!isBrowser) return;
    localStorage.clear();
  }
}

//A utilty function for handling API requests with loading,success and error handling
export const requestHandler = async (api, setLoading, onSuccess, onError) => {
  if (setLoading) setLoading(true);

  try {
    //Making the api request

    const response = await api();
    const { data } = response;
    if (data && data.success) {
      onSuccess(data);
    }
  } catch (error) {
    console.log(error);
    if (error && error.response && [401, 403].includes(error.response.status)) {
      localStorage.clear();
      if (isBrowser) {
        window.location.href = "/login"; //redirects to login page
      }
    }

    onError({
      variant: "destructive",
      description: error?.response?.data?.message || "Something went wrong",
    });
  } finally {
    if (setLoading) setLoading(false);
  }
};
