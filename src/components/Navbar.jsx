import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Tooltip,
  createTheme,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import corpconLogo from "../assets/corpcon-logo.png";
import christLogo from "../assets/christ-light1.png";
import MenuIcon from "@mui/icons-material/Menu";

const Wrapper = styled(Grid)`
  /*  div {
    border: 1px solid red;
  }
 */

  background-color: rgba(0, 0, 0, 0.9);
  padding: 5px 0px 5px 0px;
  max-height: 90px;

  .corpcon-logo {
    padding-left: 40px;
    img {
      width: 80px;
    }
  }

  .christ-logo {
    padding-right: 40px;
    cursor: pointer;
    img {
      height: 60px;
    }
  }

  .navlist-text {
    font-weight: 900px;
    color: white;
  }

  .navlist-container {
    padding-right: 0px;
  }

  .navlist-item {
    cursor: pointer;
  }
`;

const Navbar = () => {
  const navbarList = [
    {
      name: "Home",
      href: "#home",
    },
    {
      name: "About us",
      href: "#about-us",
    },
    {
      name: "Schedules",
      href: "#schedules",
    },
    {
      name: "Contact us",
      href: "#contact-us",
    },
  ];

  const theme = useTheme();
  const customTheme = createTheme({
    breakpoints: {
      values: {
        tablet: 900,
        breakpoint1: 1300,
        breakpoint2: 600,
        ...theme.breakpoints.values,
      },
    },
  });

  const isTablet = useMediaQuery(customTheme.breakpoints.down("tablet"));
  const isBreakpoint1 = useMediaQuery(
    customTheme.breakpoints.down("breakpoint1")
  );
  const isBreakpoint2 = useMediaQuery(
    customTheme.breakpoints.down("breakpoint2")
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const toggleMenu = (event) => {
    setIsMenuOpen(!isMenuOpen);
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setMenuAnchorEl(null);
  };

  const handleMenuClick = (href) => {
    handleCloseMenu();
    setTimeout(() => {
      scrollToAnchor(href);
    }, 300);
  };

  const scrollToAnchor = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClickChrist = () => {
    window.open("https://christuniversity.in", "_blank");
  };

  return (
    <Wrapper
      item
      container
      justifyContent={isTablet ? "flex-start" : "flex-start"}
    >
      {isBreakpoint1 && (
        <Grid
          item
          container
          md={2}
          sm={3}
          xs={3}
          justifyContent={isTablet ? "center" : "flex-start"}
          alignContent={"center"}
          className="christ-logo"
          style={{ paddingLeft: isBreakpoint2 ? 0 : 30, paddingRight: 0 }}
          onClick={handleClickChrist}
        >
          <img
            src={christLogo}
            alt="christ-logo"
            style={{ height: isBreakpoint2 && 40 }}
          />
        </Grid>
      )}
      <Grid
        item
        container
        md={isBreakpoint1 ? 2 : 1}
        sm={3}
        xs={7}
        justifyContent={"center"}
        alignContent={"center"}
        className="corpcon-logo"
      >
        <img src={corpconLogo} alt="corpcon-logo" />
      </Grid>

      <Grid
        item
        container
        md={isBreakpoint1 ? 8 : 11}
        sm={6}
        xs={2}
        justifyContent={isTablet && "flex-end"}
        style={{
          paddingRight: isBreakpoint2
            ? 0
            : isTablet
            ? 10
            : isBreakpoint1
            ? 30
            : 0,
        }}
      >
        {!isTablet && (
          <Grid
            item
            container
            md={isBreakpoint1 ? 12 : 10}
            justifyContent={"flex-end"}
            alignItems={"center"}
            gap={6}
            className="navlist-container"
          >
            {navbarList.map((item, index) => {
              return (
                <Grid
                  key={index}
                  item
                  className="navlist-item"
                  onClick={() => handleMenuClick(item.href)}
                >
                  {item.name === "Schedules" ? (
                    <Tooltip title={"Coming soon"}>
                      <p className="navlist-text">{item.name}</p>
                    </Tooltip>
                  ) : (
                    <p className="navlist-text">{item.name}</p>
                  )}
                </Grid>
              );
            })}
          </Grid>
        )}

        {!isBreakpoint1 && !isTablet && (
          <Grid
            item
            container
            md={2}
            justifyContent={"flex-end"}
            alignContent={"center"}
            className="christ-logo"
            onClick={handleClickChrist}
          >
            <img src={christLogo} alt="christ-logo" />
          </Grid>
        )}

        {isTablet && (
          <Grid item container justifyContent={"center"} sm={2}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
          </Grid>
        )}

        {isMenuOpen && isTablet && (
          <Popover
            open={isMenuOpen && isTablet}
            anchorEl={menuAnchorEl}
            onClose={toggleMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <List>
              {navbarList.map((item, index) => {
                if (item.name === "Schedules") {
                  return (
                    <Tooltip title={"Coming soon"}>
                      <ListItem
                        button
                        key={index}
                        onClick={() => handleMenuClick(item.href)}
                      >
                        <ListItemText primary={item.name} />
                      </ListItem>
                    </Tooltip>
                  );
                } else {
                  return (
                    <ListItem
                      button
                      key={index}
                      onClick={() => handleMenuClick(item.href)}
                    >
                      <ListItemText primary={item.name} />
                    </ListItem>
                  );
                }
              })}
            </List>
          </Popover>
        )}
      </Grid>
    </Wrapper>
  );
};

export default Navbar;
