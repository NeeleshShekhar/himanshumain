import image from "../assets/8767132.jpg";
import heroImg from "../assets/profile.png";

const Hero = () => {
  return (
    <div className='prose prose-stone mx-5 my-12 flex max-w-7xl flex-col items-center md:flex-row lg:mx-auto'>
      
      <div className=''>
        <h1 className=' bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text py-3 text-3xl font-extrabold text-transparent lg:text-5xl'>
          Hi There! 👋🏻
          <br />
          I'M Neelesh Shekhar
        </h1>
        <p className='text-gray-400 md:pt-4 lg:text-lg'>
        An Individual with a Computer Science background with an excellent analytical perspective towards solving problems. I have experience in the Digital transformation of organizations by analyzing real data sets.
        </p>
      </div>
      <div style={{background:'white'}}>
        <img
          loading='lazy'
          className='w-full rounded-lg  '
          src={heroImg}
          alt=''
        />
      </div>
    </div>
  );
};

export default Hero;
