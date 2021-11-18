let Server;

if (process.env.NODE_ENV === "production") {
  Server = "https://metaversebullets.vercel.app/api/";
} else {
  Server = "http://localhost:5000/api/";
}
export default Server;  