import React, { useState } from "react";
import {
  Grid,
  Tooltip,
  createTheme,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Navbar from "../components/Navbar";
import backgroundImg from "../assets/bg-colorred.gif";
import bestPractices from "../assets/best-practices.png";
import techForDisabled from "../assets/tech-for-disabled.png";
import latestResearch from "../assets/latest-research.png";
import corpconLogo from "../assets/corpcon-tagline-dark.png";
import christLogo from "../assets/christ-black.png";
import x from "../assets/x.png";
import fb from "../assets/fb.jpg";
import lin from "../assets/lin.jpg";
import ig from "../assets/ig.png";
import emailUs from "../assets/email-us.png";
import callUs from "../assets/call-us.png";
import addressVector from "../assets/address-vector.png";
import RegistrationOne from "../components/RegistrationOne";
import RegistrationTwo from "../components/RegistrationTwo";
import RegistrationThree from "../components/RegistrationThree";
import RegistrationFour from "../components/RegistrationFour";
import RegistrationFive from "../components/RegistrationFive";
import RegistrationSix from "../components/RegistrationSix";
import SnackbarAlert from "../components/SnackBarAlert";
import RegistrationSeven from "../components/RegistrationSeven";
import RegistrationEight from "../components/RegistrationEight";

const HeroWrapper = styled(Grid)`
  /* div {
    border: 1px solid red;
  } */

  background-image: url(${backgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;

  .topbar {
    position: sticky;
    top: 0;
    min-height: 70px;
    width: 100vw;
    z-index: 100;
  }

  .tint {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .hero-banner {
    padding: 20px 30px 30px 30px;
    min-height: 87vh;

    .left-banner {
      padding-left: 250px;

      @media screen and (max-width: 1300px) {
        padding-left: 0px;
      }

      .christ {
        @media screen and (max-width: 600px) {
          padding-bottom: 5px;
        }

        p {
          font-weight: 600;
          font-size: 22px;
          color: white;
          text-shadow: 2px 2px 2px rgba(0, 0, 0, 6);

          @media screen and (max-width: 1300px) {
            font-size: 18px;
          }
        }
      }

      .corpcon p {
        margin: 0px;
        font-weight: 900;
        font-size: 50px;
        color: white;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 1);

        .c-text {
          font-family: roboto;
          font-size: 55px;

          @media screen and (max-width: 600px) {
            font-size: 40px;
          }
        }

        @media screen and (max-width: 600px) {
          font-size: 35px;
        }
      }

      .mscsa p {
        font-weight: 500;
        font-size: 20px;

        margin: 0px;
      }
    }
  }

  .section-header {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 20;

    h3 {
      font-size: 30px;
      margin-bottom: 0px;

      @media screen and (max-width: 400px) {
        font-size: 20px;
      }
    }

    p {
      font-size: 20px;

      @media screen and (max-width: 400px) {
        font-size: 16px;
      }
    }
  }

  .events-list {
    padding: 40px;
  }

  .events-tab {
    background-color: rgba(145, 250, 26, 0.4);
    border-radius: 20px;
    padding: 40px;

    @media screen and (max-width: 400px) {
      padding: 10px;
    }

    h3 {
      margin: 0px;
      margin-bottom: 10px;
      font-weight: 900;
      color: white;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    }

    p {
      margin: 0px;
      padding: 0px;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);

      @media screen and (max-width: 400px) {
        font-size: 16px;
      }
    }
  }

  .events-tab:nth-child(1) {
    background: rgba(106, 229, 232, 0.4);
  }

  .events-tab:nth-child(3) {
    background-color: rgba(250, 128, 26, 0.4);
  }

  .events-image {
    min-height: 200px;
    img {
      width: 200px;
      height: 200px;
    }
  }

  .events-title {
    min-height: 50px;
  }

  .events-description {
    min-height: 150px;

    p {
      text-align: justify;
    }
  }

  .about-us {
    padding: 30px;

    @media screen and (max-width: 400px) {
      padding: 10px;
    }

    .about-us-item {
      padding-bottom: 40px;

      h3 {
        font-weight: 900;
        font-size: 30px;
        color: white;
        margin: 0px;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

        @media screen and (max-width: 400px) {
          font-size: 20px;
        }
      }

      p {
        letter-spacing: 0.8px;
        line-height: 30px;
        text-align: justify;
        font-size: 18px;
        font-weight: 400;
        font-size: 18px;
        margin-top: 0;
        color: white;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

        @media screen and (max-width: 400px) {
          font-size: 16px;
        }
      }

      .item-header {
        padding-bottom: 30px;
      }
    }
  }

  .about-logo-container {
    background-color: rgba(255, 255, 22556, 0.85);
    border-radius: 20px;
    padding: 40px;

    width: 600px;
    height: 300px;

    @media screen and (max-width: 700px) {
      width: 400px;
      height: 200px;
    }

    @media screen and (max-width: 400px) {
      width: 300px;
      height: 200px;
    }

    img {
      height: 250px;

      @media screen and (max-width: 700px) {
        height: 130px;
      }

      @media screen and (max-width: 400px) {
        height: 130px;
      }
    }
  }

  .contact-us {
    padding: 60px 30px 0px 40px;

    @media screen and (max-width: 400px) {
      padding: 20px 5px 0px 5px;
    }

    .contact-us-item {
      min-height: 150;
    }

    .contact-image-grid {
      background-color: rgba(255, 255, 22556, 0.85);
      border-radius: 20px;
      padding: 40px;
      width: 100px;
      height: 100px;

      img {
        width: 70px;
      }
    }

    .contact-description {
      padding-left: 30px;
      padding-bottom: 60px;

      @media screen and (max-width: 400px) {
        padding-left: 0px;
        padding-bottom: 10px;
      }
    }
  }

  .contact-us-vector {
    width: 70px;
  }

  .footer {
    background: black;
    min-height: 80px;
  }

  .email-address {
    color: white;
    font-family: "Roboto Mono", monospace;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  h3 {
    @media screen and (max-width: 400px) {
      font-size: 16px;
    }
  }

  p {
    @media screen and (max-width: 400px) {
      font-size: calc(12px + 0.5vw);
    }
  }

  .social-media-logo {
    transition: transform 0.1s ease;
    cursor: pointer;
  }

  .social-media-logo:hover {
    transform: scale(1.1);
  }

  .date {
    p {
      font-size: 24px;
      font-weight: 700;
      margin: 0px;
    }
  }
`;

const LandingPage = () => {
  const eventsList = [
    {
      imgUrl: bestPractices,
      title: "Best Practices in Tech",
      description:
        "Explore the world of assistive technologies and their profound impact on the lives of individuals with disabilities. Discover innovations that break down barriers, foster independence, and promote greater accessibility within the digital landscape.",
    },
    {
      imgUrl: techForDisabled,
      title: "Tech for the Disabled",

      description:
        "Gain valuable insights and proven methodologies from seasoned tech professionals. Learn from their experience to enhance your workflows, optimize decision-making, and streamline processes across various technological domains.",
    },
    {
      imgUrl: latestResearch,
      title: "Research and Innovation",

      description:
        "Delve into the latest technological breakthroughs and the exciting innovations driving the future of the industry. Get a first-hand look at cutting-edge technologies, stay informed about emerging trends, and discover the advancements that will shape the tech landscape.",
    },
  ];

  const [signupStage, setSignupStage] = useState(1);

  const [email, setEmail] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [yoe, setYoe] = useState("");

  const [domain, setDomain] = useState("");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");

  const [fileName, setFileName] = useState("");

  const [alertOpen, setAlertOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  let registrationComponent;
  switch (signupStage) {
    case 1: {
      registrationComponent = (
        <RegistrationOne
          setSignupStage={setSignupStage}
          email={email}
          setEmail={setEmail}
          setSelectedType={setSelectedType}
          setName={setName}
          setPhoneNumber={setPhoneNumber}
          setDesignation={setDesignation}
          setCompany={setCompany}
          setYoe={setYoe}
          setDomain={setDomain}
          setTitle={setTitle}
          setAbstract={setAbstract}
          setAlertOpen={setAlertOpen}
          setMessage={setMessage}
          setSeverity={setSeverity}
        />
      );
      break;
    }
    case 2: {
      registrationComponent = (
        <RegistrationTwo
          setSignupStage={setSignupStage}
          email={email}
          setEmail={setEmail}
          setAlertOpen={setAlertOpen}
          setMessage={setMessage}
          setSeverity={setSeverity}
        />
      );
      break;
    }
    case 3: {
      registrationComponent = (
        <RegistrationThree
          setSignupStage={setSignupStage}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      );
      break;
    }
    case 4: {
      registrationComponent = (
        <RegistrationFour
          setSignupStage={setSignupStage}
          selectedType={selectedType}
          name={name}
          setName={setName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          designation={designation}
          setDesignation={setDesignation}
          company={company}
          setCompany={setCompany}
          yoe={yoe}
          setYoe={setYoe}
          setAlertOpen={setAlertOpen}
          setMessage={setMessage}
          setSeverity={setSeverity}
        />
      );
      break;
    }
    case 5: {
      registrationComponent = (
        <RegistrationFive setSignupStage={setSignupStage} />
      );
      break;
    }
    case 6: {
      registrationComponent = (
        <RegistrationSix
          setSignupStage={setSignupStage}
          domain={domain}
          setDomain={setDomain}
          title={title}
          setTitle={setTitle}
          abstract={abstract}
          setAbstract={setAbstract}
          setAlertOpen={setAlertOpen}
          setMessage={setMessage}
          setSeverity={setSeverity}
        />
      );
      break;
    }
    case 7: {
      registrationComponent = (
        <RegistrationSeven
          setSignupStage={setSignupStage}
          setFileName={setFileName}
          setAlertOpen={setAlertOpen}
          setMessage={setMessage}
          setSeverity={setSeverity}
        />
      );
      break;
    }
    case 8: {
      registrationComponent = (
        <RegistrationEight
          setSignupStage={setSignupStage}
          fileName={fileName}
        />
      );
      break;
    }
    default: {
      registrationComponent = (
        <RegistrationOne setSignupStage={setSignupStage} />
      );
    }
  }

  const theme = useTheme();
  const customTheme = createTheme({
    breakpoints: {
      values: {
        mobile: 600,
        breakpoint1: 1300,
        breakpoint2: 900,

        ...theme.breakpoints.values,
      },
    },
  });

  const isMobile = useMediaQuery(customTheme.breakpoints.down("mobile"));
  const isBreakpoint1 = useMediaQuery(
    customTheme.breakpoints.down("breakpoint1")
  );
  const isBreakpoint2 = useMediaQuery(
    customTheme.breakpoints.down("breakpoint2")
  );

  const handleClickSocialMedia = (link) => {
    window.open(`${link}`, "_blank");
  };

  return (
    <HeroWrapper
      container
      className="wrapper"
      justifyContent={"flex-start"}
      alignContent={"flex-start"}
    >
      <SnackbarAlert
        open={alertOpen}
        setOpen={setAlertOpen}
        message={message}
        setMessage={setMessage}
        severity={severity}
        setSeverity={setSeverity}
      />
      <Grid container className="tint">
        <div id={"home"} />
        <Grid item container md={12} className="topbar">
          <Navbar />
        </Grid>
        <Grid container alignContent={"center"} className="hero-banner">
          <Grid
            item
            container
            justifyContent={isBreakpoint1 && "center"}
            alignContent={"center"}
            md={isBreakpoint1 ? 12 : 6}
            sm={12}
            className="left-banner"
          >
            <Grid
              item
              md={12}
              container
              justifyContent={
                isMobile ? "flex-start" : isBreakpoint1 && "center"
              }
              className="christ"
            >
              {isMobile ? (
                <>
                  <p style={{ margin: 0 }}>CHRIST</p>
                  <p style={{ margin: 0 }}> (Deemed to be University)</p>
                </>
              ) : (
                <p>CHRIST (Deemed to be University)</p>
              )}
            </Grid>
            <Grid
              item
              md={12}
              container
              justifyContent={
                isMobile ? "flex-start" : isBreakpoint1 && "center"
              }
              className="corpcon"
            >
              <p>
                <span className="c-text">CORPCON</span>
                <span className="c-text"></span> 2024
              </p>
            </Grid>
            <Grid
              item
              md={12}
              container
              justifyContent={
                isMobile ? "flex-start" : isBreakpoint1 && "center"
              }
              className="presented-by"
            >
              <p>presented by</p>
            </Grid>
            <Grid
              item
              md={12}
              container
              justifyContent={
                isMobile ? "flex-start" : isBreakpoint1 && "center"
              }
              className="mscsa"
            >
              <p>MSc CSA, Dept. of Computer Science</p>
            </Grid>
          </Grid>

          <Grid
            item
            justifyContent={"center"}
            container
            md={isBreakpoint1 ? 12 : 6}
            sm={12}
            style={{ paddingTop: isBreakpoint1 && 30 }}
          >
            {registrationComponent}
          </Grid>

          <Grid
            container
            justifyContent={"center"}
            alignContent={"center"}
            style={{ paddingTop: 70 }}
          >
            <Grid
              item
              md={12}
              container
              justifyContent={"center"}
              alignContent={"center"}
              className="date"
            >
              <p>13th April 2024</p>
            </Grid>
            <Grid
              item
              md={12}
              container
              justifyContent={"center"}
              alignContent={"center"}
              style={{ textAlign: "center" }}
            >
              <p>
                CHRIST (Deemed to be University), Central Campus Hosur Road,
                Bengaluru, India, 560029.
              </p>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"}>
          <Grid container className="section-header">
            <Grid item container justifyContent={"center"} md={12}>
              <h3>Tracks</h3>
            </Grid>
            <Grid item container justifyContent={"center"} md={12}>
              <p>Expert talks on</p>
            </Grid>
          </Grid>

          <Grid
            item
            container
            gap={5}
            justifyContent={"space-around"}
            className="events-list"
          >
            {eventsList.map((item, index) => {
              return (
                <Grid
                  key={index}
                  item
                  container
                  md={3.3}
                  sm={10}
                  alignContent={"center"}
                  alignItems={"center"}
                  className="events-tab"
                >
                  <Grid
                    item
                    container
                    md={12}
                    justifyContent={"center"}
                    className="events-image"
                    style={{
                      minHeight: isBreakpoint2 ? 180 : 200,
                    }}
                  >
                    <img
                      src={item.imgUrl}
                      alt="expert-talks"
                      style={{
                        width: isBreakpoint2 ? 180 : 220,
                        height: isBreakpoint2 ? 180 : 200,
                      }}
                    />
                  </Grid>

                  <Grid
                    item
                    container
                    md={12}
                    justifyContent={"center"}
                    alignContent={"center"}
                    alignItems={"center"}
                    className="events-title"
                    style={{
                      minHeight: isBreakpoint2 ? 20 : 50,
                      paddingTop: isBreakpoint2 ? 20 : 0,
                    }}
                  >
                    <h3>{item.title}</h3>
                  </Grid>
                  <Grid
                    container
                    item
                    alignContent={"flex-start"}
                    alignItems={"flex-start"}
                    className="events-description"
                    style={{
                      minHeight: isBreakpoint2 ? 100 : 150,
                      paddingTop: isBreakpoint2 ? 10 : 0,
                    }}
                  >
                    <p>{item.description}</p>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid container>
          <div id={"about-us"} />
          <Grid container className="section-header">
            <Grid item container justifyContent={"center"} md={12}>
              <h3>About us</h3>
            </Grid>
            <Grid item container justifyContent={"center"} md={12}>
              <p>We are</p>
            </Grid>
          </Grid>

          <Grid container className="about-us">
            <Grid
              item
              container
              alignItems={"flex-start"}
              className="about-us-item"
            >
              <Grid item container md={isBreakpoint1 ? 12 : 6}>
                <Grid item container md={12} className="item-header">
                  <h3>CORPCON 2024</h3>
                </Grid>
                <Grid item>
                  <p>
                    CORPCON is an annual corporate conference hosted by the
                    Department of Computer Science at Christ University. It
                    serves as an integrating platform for professionals and tech
                    enthusiasts from diverse backgrounds to connect,
                    collaborate, and explore emerging trends in the world of
                    technology.
                  </p>
                </Grid>
              </Grid>
              <Grid
                item
                container
                justifyContent={"center"}
                md={isBreakpoint1 ? 12 : 6}
                style={{ paddingTop: isBreakpoint1 ? 10 : 0 }}
              >
                <Grid
                  item
                  container
                  justifyContent={"center"}
                  alignContent={"center"}
                  className="about-logo-container"
                >
                  <img
                    src={corpconLogo}
                    alt="corpcon"
                    className="about-img-corpcon"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              alignItems={"flex-start"}
              className="about-us-item"
            >
              <Grid item container md={isBreakpoint1 ? 12 : 6}>
                <Grid item container md={12} className="item-header">
                  <h3>CHRIST (Deemed to be University)</h3>
                </Grid>
                <Grid item>
                  <p>
                    CHRIST (Deemed to be University), Bangalore is a
                    multi-disciplinary experience that offers students the
                    opportunity to grow both professionally and personally. The
                    university has a diverse student population, with students
                    from all over India and the world. The faculty and staff are
                    highly qualified, encouraging students to think critically
                    and abide by the moto "excellence and service".
                  </p>
                </Grid>
              </Grid>
              <Grid
                item
                container
                md={isBreakpoint1 ? 12 : 6}
                sm={12}
                justifyContent={"center"}
                style={{ paddingTop: isBreakpoint1 ? 10 : 0 }}
              >
                <Grid
                  item
                  container
                  justifyContent={"center"}
                  alignContent={"center"}
                  className="about-logo-container"
                >
                  <img
                    src={christLogo}
                    alt="christ"
                    className="about-img-christ"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              alignItems={"flex-start"}
              className="about-us-item"
              style={{ paddingBottom: 0 }}
            >
              <Grid item container md={12}>
                <Grid item container md={12} className="item-header">
                  <h3>MSc CSA</h3>
                </Grid>
                <Grid item>
                  <p>
                    The MSc in Computer Science and Applications offered by
                    CHRIST (Deemed to be University) is an excellent option for
                    professionals working in the software industry or related
                    fields. The program is designed to enhance their existing
                    academic foundations with a comprehensive understanding of
                    the use and application of information technology. Graduates
                    of this program will be well-equipped to take on leadership
                    roles in the software industry and make significant
                    contributions to the development of innovative technology
                    solutions.
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <div id={"contact-us"} />
          <Grid container className="section-header">
            <Grid item container justifyContent={"center"} md={12}>
              <h3>Got questions?</h3>
            </Grid>
            <Grid item container justifyContent={"center"} md={12}>
              <p>Feel free to reach out to us</p>
            </Grid>
          </Grid>

          <Grid item container justifyContent={"center"} className="contact-us">
            <Grid
              item
              container
              justifyContent={"center"}
              alignItems={"flex-start"}
              className="contact-us-item"
            >
              <Grid
                item
                container
                justifyContent={"center"}
                alignContent={"center"}
                className="contact-image-grid"
              >
                <img src={addressVector} alt="email us" />
              </Grid>

              <Grid
                item
                container
                md={6}
                sm={7}
                xs={12}
                className="contact-description"
              >
                <Grid
                  item
                  container
                  md={12}
                  justifyContent={"flex-start"}
                  alignContent={"center"}
                >
                  <h3 style={{ marginTop: 0 }}>Address</h3>
                  <p style={{ margin: 0 }}>
                    CHRIST (Deemed to be University), Central Campus Hosur Road,
                    Bengaluru, India, 560029.
                  </p>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              justifyContent={"center"}
              alignItems={"flex-start"}
              className="contact-us-item"
            >
              <Grid
                item
                container
                justifyContent={"center"}
                alignContent={"center"}
                className="contact-image-grid"
              >
                <img
                  src={emailUs}
                  alt="email us"
                  className="contact-us-vector"
                />
              </Grid>

              <Grid
                item
                container
                md={6}
                sm={7}
                className="contact-description"
              >
                <Grid
                  item
                  container
                  md={12}
                  justifyContent={"flex-start"}
                  alignContent={"center"}
                >
                  <Grid item container>
                    <h3 style={{ marginTop: 0 }}>Email us</h3>
                  </Grid>
                  <Tooltip
                    disableTouchListener
                    title="support.corpcon@conference.christuniversity.in"
                  >
                    <Grid item className="email-address">
                      support.corpcon@conference.christuniversity.in
                    </Grid>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              justifyContent={"center"}
              alignItems={"flex-start"}
              className="contact-us-item"
            >
              <Grid
                item
                container
                justifyContent={"center"}
                alignContent={"center"}
                className="contact-image-grid"
              >
                <img
                  src={callUs}
                  alt="email us"
                  className="contact-us-vector"
                />
              </Grid>

              <Grid
                item
                container
                md={6}
                sm={7}
                className="contact-description"
              >
                <Grid
                  item
                  container
                  md={12}
                  justifyContent={"flex-start"}
                  alignContent={"center"}
                >
                  <Grid item container>
                    <h3 style={{ marginTop: 0 }}>Call us</h3>
                  </Grid>
                  <Grid item container>
                    <p style={{ marginBottom: 0 }}>
                      CHRIST (Deemed to be University)
                    </p>
                  </Grid>
                  <Grid item container>
                    <p style={{ marginTop: 0 }}>08040129337</p>
                  </Grid>
                  <Grid item container>
                    <p style={{ marginBottom: 0 }}>Amrith Niyogi</p>
                  </Grid>
                  <Grid item container>
                    <p style={{ marginTop: 0 }}>+91 7899425589</p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          className="footer"
          alignContent={"center"}
          justifyContent={"flex-end"}
        >
          <Grid
            item
            container
            md={4}
            justifyContent="center"
            alignContent={"flex-end"}
          >
            <p style={{ textAlign: "center" }}>
              CorpCon 2024. Christ University, Bengaluru.
            </p>
          </Grid>

          <Grid
            item
            container
            md={isBreakpoint2 ? 4 : 4}
            gap={4}
            justifyContent={isBreakpoint2 ? "center" : "flex-end"}
            alignContent={"center"}
            style={{ paddingRight: isBreakpoint2 ? 0 : 40 }}
          >
            <Grid
              item
              onClick={() =>
                handleClickSocialMedia(
                  "https://www.linkedin.com/company/corpcon/"
                )
              }
            >
              <img
                src={lin}
                style={{
                  width: 25,
                  padding: 5,
                  paddingTop: 5 /* , border: "1px solid white" */,
                }}
                className="social-media-logo"
              />
            </Grid>
            <Grid
              item
              onClick={() =>
                handleClickSocialMedia("https://twitter.com/corpcon_in")
              }
            >
              <img
                src={x}
                style={{
                  width: 20,
                  padding: 5,
                  paddingTop: 9 /* , border: "1px solid white" */,
                }}
                className="social-media-logo"
              />
            </Grid>
            <Grid
              item
              onClick={() =>
                handleClickSocialMedia("https://www.instagram.com/corpcon.in/")
              }
            >
              <img
                src={ig}
                style={{
                  width: 22,
                  padding: 7 /* , border: "1px solid white" */,
                }}
                className="social-media-logo"
              />
            </Grid>
            <Grid
              item
              onClick={() =>
                handleClickSocialMedia("https://www.facebook.com/corpcon.in/")
              }
            >
              <img
                src={fb}
                style={{
                  width: 34,
                  padding: 0 /* , border: "1px solid white" */,
                }}
                className="social-media-logo"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </HeroWrapper>
  );
};

export default LandingPage;
