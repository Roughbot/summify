import logo from "../../public/reports.png";
const Hero = () => {
  return (
    <header className="w-full flex flex-col justify-center items-center">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="logo" className="w-14 object-contain" />
        <button
          type="button"
          onClick={() => window.open("https://github.com/roughbot")}
          className="black_btn"
        >
          Github
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="blue_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading experience with the help of AI,{" "}
        <span className="blue_gradient">Summify </span>
        is an open-source tool that summarizes articles using OpenAI{"'"}s GPT-4
        and provide you with clear and concise summaries.
      </h2>
    </header>
  );
};

export default Hero;
