import { AppShell, Button, Code, Group, Text, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import {
  IconLogout,
  IconPackage,
  IconChartBar,
  IconListDetails,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import classes from "./Navbar.module.css";
import { useAuth } from "../../../../hooks/useAuth";

const data = [
  { link: "", label: "Products", icon: IconPackage },
  { link: "", label: "Analytics", icon: IconChartBar },
  { link: "", label: "Orders", icon: IconListDetails },
];

export default function NavbarSimple() {
  const { logout } = useAuth();

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === "Products" || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => event.preventDefault()}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <AppShell.Navbar>
      <nav className={classes.navbar} >
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <Text fw={500}>Ecommerce Admin<br></br>Dashboard</Text>
            <Button variant="subtle" size="sm" onClick={toggleColorScheme}>
              {computedColorScheme === "dark" ? <IconMoon color="#F5F3CE" /> : <IconSun color="#F28C38" />}
            </Button>
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
            <Text size="sm" fw={500}>
              Logged in as <Code fz="sm" fw={500}>cxnub</Code>
            </Text>

          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();

              // Call the logout function
              logout();
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </nav>
    </AppShell.Navbar>
  );
}
