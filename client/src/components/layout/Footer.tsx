import React from "react";
import { Container, Grid, Typography, Link } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

interface FooterProps {
}

export const Footer = ({  }: FooterProps) => {
  return (
    <footer>
      <Container>
        <Grid container>
          <Grid item xs>
            <Typography variant="subtitle1" color="textSecondary" component="p">
              Made with <FontAwesomeIcon icon={faHeart} /> by Erno Wever
              <br />
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              component="p"
              align="right"
            >
              <Link
                href="https://github.com/ernoW"
                target="_blank"
                rel="noopener"
              >
                <FontAwesomeIcon icon={faGithub} />
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};
