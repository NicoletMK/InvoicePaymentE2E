import {
  IconReceipt2,
  IconLicense,
  IconSettings,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import { Navbar, Text, createStyles } from "@mantine/core";
import Head from "next/head";
import { useState } from "react";

const tabs = [
  { link: "/invoices", label: "Invoicing", icon: IconLicense },
  { link: "/clients", label: "Clients", icon: IconUser },
];

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color: theme.white,

    "&:hover": {
      backgroundColor: theme.colors.dark[6],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.colors.dark[5],
    },
  },

  footer: {
    borderTop: `2px solid ${theme.colors.dark[4]}`,
    paddingTop: theme.spacing.md,
  },
}));

export function NavBar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");

  const links = tabs.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar width={{ sm: 300 }} p="md">
      <Navbar.Section>
        <Text weight={500} size="sm" color="dimmed" mb="xs">
          Invoice-Bill-Psuedo-System
        </Text>
      </Navbar.Section>

      <Navbar.Section grow mt="xl">
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSettings stroke={1.5} />
          <span>Settings</span>
        </a>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
