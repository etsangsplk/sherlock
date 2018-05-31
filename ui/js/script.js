const fetchTrace = (id) => {
  return fetch(`/api/trace/${id}`)
    .then(res => {
      if (res.status !== 200) {
        console.log(res);
      }
      return res;
    })
    .then(res => res.json())
    .then(res => console.log({ res }))
    .catch(error => console.log(error));
}

fetchTrace(34530);
