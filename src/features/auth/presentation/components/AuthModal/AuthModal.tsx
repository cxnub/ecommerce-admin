import { Modal, Tabs } from "@mantine/core";
import { useState } from "react";
import { LogInPanel } from "../AuthTabPanels/LogInPanel";
import { SignUpPanel } from "../AuthTabPanels/SignUpPanel";

interface LoginModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function LoginMoadl({ opened, onClose }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<string | null>("signup");

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 5,
      }}
    >
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="signup">Sign Up</Tabs.Tab>
          <Tabs.Tab value="login">Log In</Tabs.Tab>
        </Tabs.List>
        <LogInPanel setActiveTab={setActiveTab} />
        <SignUpPanel setActiveTab={setActiveTab} />
      </Tabs>
    </Modal>
  );
}
