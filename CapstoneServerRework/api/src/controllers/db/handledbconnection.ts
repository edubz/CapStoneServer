const handleDbConnect = () => console.log('connected to db');
const handleDbError = (err: Error) => console.log(err);
export { handleDbConnect, handleDbError }