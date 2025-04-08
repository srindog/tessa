const fetcher = async (url: string) => {
  const res: any = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error: any = new Error(`An error occurred while fetching ${url}.`);
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export { fetcher };
