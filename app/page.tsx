import Navbar from "../components/navigation/Navbar";
import PostList from "../components/post/PostList";

const Home = async () => {
	return (
		<div>
			<Navbar />
			<PostList />
		</div>
	);
};

export default Home;
