
import FAQs from "../../components/LandingPage/FAQs/FAQs";
import About from "../../components/LandingPage/About/About";
import Navbar from "../../components/LandingPage/Navbar/Navbar";
import Footer from "../../components/LandingPage/Footer/Footer";
import HowItWorks from "../../components/LandingPage/HowItWorks/HowItWorks";
import TrendingPost from "../../components/LandingPage/TrendingPosts/TrendingPost";
import HeroSection from "../../components/LandingPage/HeroSection/HeroSection";
import AttractiveCompo from "../../components/LandingPage/AttractiveCompo/AttractiveCompo";
import WhyBattlechan from "../../components/LandingPage/WhyBattlechan/WhyBattlechan";

import { backend } from "../../../../declarations/backend/index"


type Theme = {
  darkColor: string;
  lightColor: string;
  handleThemeSwitch: any;
};

function Landing(props: Theme) {
  const darkColor = props.darkColor;
  const lightColor = props.lightColor;
  const handleThemeSwitch = props.handleThemeSwitch;
  const className = "LandingPage";

  // const { isConnected } = useConnect();
  // const navigate = useNavigate();

  // React.useEffect(() => {
  //   if (isConnected) {
  //     navigate("/dashboard");
  //   } else {
  //     navigate("/");
  //   }
  // }, [isConnected, navigate]);

  type BackendResponseDirect = {
    status: boolean;
    data: any[]; // Replace 'any' with a more specific type if possible
    error: string[];
};

async function Helo() {
  console.log("hello");
  const response = await backend.getTotalPostInBoard(); // Assuming the casting is handled elsewhere or not necessary here.
  
  // Assuming 'response.data[0]' contains the array of boards
  const boards = response.data[0];
  
  if (boards && boards.length > 0) {
      // Loop through each board and print the boardName
      boards.forEach((board) => {
          // console.log(board.name);
      });
  } else {
      console.log("No boards found.");
  }
  console.log(boards)
}


  

  return (
    <main
      className={
        className + ` w-full h-full bg-${darkColor} text-${lightColor}`
      }
    >
      <Navbar
        darkColor={darkColor}
        lightColor={lightColor}
        handleThemeSwitch={handleThemeSwitch}
      />
      <HeroSection darkColor={darkColor} lightColor={lightColor} />

      <About />
      <HowItWorks />

      <TrendingPost darkColor={darkColor} lightColor={lightColor} />
      <WhyBattlechan darkColor={darkColor} lightColor={lightColor} />
      <AttractiveCompo darkColor={darkColor} lightColor={lightColor} />
      <FAQs darkColor={darkColor} lightColor={lightColor} />

      <Footer />
    </main>
  );
}

export default Landing;
