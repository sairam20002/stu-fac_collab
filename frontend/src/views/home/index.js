import {
  Jumbotron,
  Button,
  Image,
  Row,
  Col,
  Carousel,
  Alert,
} from "react-bootstrap";
import { THEME } from "../../constants";
import CustomCard from "../../components/home";
import image from "../../assets/images/home-page.jpg";
import imageA from "../../assets/images/1-connectivity.png";
import imageB from "../../assets/images/2-bulb-idea.jpg";
import imageC from "../../assets/images/3-innovation.jpg";
import { MESSENGER_URL } from "../../endpoints";
import { MESSENGER } from "../../constants";
import { isAutheticated } from "../../_helpers";
const { user } = isAutheticated();
const Home = () => {
  console.log(image);
  return (
    <>
      <Jumbotron
        style={{
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between",
          width: "100%",
          height: window.innerHeight * 0.6,
          backgroundColor: THEME.turquoiseBlue,
        }}
      >
        <Carousel>
          <Carousel.Item
            interval={1000}
            style={{
              height: window.innerHeight * 0.5,
            }}
          >
            <img
              style={{
                height: window.innerHeight * 0.5,
                marginLeft: window.innerHeight * 0.6,
                marginRight: window.innerHeight * 0.5,
              }}
              src={imageA}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>FORUMS</h3>
              <p>
                Make a forum and talk about whatevery you like to talk about.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item
            interval={500}
            style={{
              height: window.innerHeight * 0.5,
            }}
          >
            <img
              style={{
                height: window.innerHeight * 0.5,
                marginLeft: window.innerHeight * 0.6,
                marginRight: window.innerHeight * 0.5,
              }}
              src={imageB}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Groups</h3>
              <p>An easy and interactive way to connect with your groups.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item
            style={{
              height: window.innerHeight * 0.5,
            }}
          >
            <img
              style={{
                height: window.innerHeight * 0.5,
                marginLeft: window.innerHeight * 0.62,
                marginRight: window.innerHeight * 0.5,
              }}
              src={imageC}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Messenger</h3>
              <p>Your personal space!</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Jumbotron>
      {user ? (
        user?.Type != "Super Admin" ? (
          <Row
            style={{
              marginLeft: 100,
              height: window.innerHeight * 0.4,
            }}
          >
            <Col>
              <CustomCard
                title={"Explore"}
                text={
                  user?.Type == "Super Admin"
                    ? "Visit Super Admin Panel"
                    : user?.Type == "Admin"
                    ? "Visit Admin Panel"
                    : "Welcome to Home"
                }
                goto={
                  user?.Type == "Super Admin"
                    ? "/super-admin"
                    : user?.Type == "Admin"
                    ? "/admin"
                    : "/"
                }
              />
            </Col>
            <Col>
              <CustomCard
                title={"Profile"}
                text={"Check your profile"}
                goto={`/profile/${user.username}`}
              />
            </Col>
            <Col>
              <CustomCard
                title={"Messenger"}
                text={"Live private conversations."}
                goto={`${MESSENGER_URL}${MESSENGER}?userId=${user?._id}`}
              />
            </Col>
          </Row>
        ) : (
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Alert variant="warning">
              Welcome Super Admin!{" "}
              <Alert.Link href="/super-admin">
                Goto Super Admin Panel
              </Alert.Link>
              .
            </Alert>
          </div>
        )
      ) : (
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Alert variant="warning">
            <Alert.Link href="/login">Login</Alert.Link> to enjoy all the
            features.
          </Alert>
        </div>
      )}
    </>
  );
};

export default Home;
