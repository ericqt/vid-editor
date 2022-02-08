const trimQ = new Bull('trim-q');

trimQ.process( async(job) => {
  console.log('did some work here');
});
