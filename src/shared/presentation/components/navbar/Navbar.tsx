import { AppShell, Button, Group, Text, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import {
  IconSwitchHorizontal,
  IconLogout,
  IconPackage,
  IconChartBar,
  IconListDetails,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import classes from "./Navbar.module.css";

const data = [
  { link: "", label: "Products", icon: IconPackage },
  { link: "", label: "Analytics", icon: IconChartBar },
  { link: "", label: "Orders", icon: IconListDetails },
];

export default function NavbarSimple() {
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
          <a
            href="#"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Change account</span>
          </a>

          <a
            href="#"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </nav>
    </AppShell.Navbar>
  );
}
