import { Button, FileButton, Group, Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSetRecoilState } from "recoil";

import { annotateCanvasState, annotateFileState } from "@/store/annotation";
import { useState } from "react";

export default function StartEntry() {
  const setFile = useSetRecoilState(annotateFileState);
  const setCanvas = useSetRecoilState(annotateCanvasState);
  const [opened, { open, close }] = useDisclosure(false);

  const [value, setValue] = useState<string | null>("640x480");

  const handleCreateImage = () => {
    const [width, height] = value?.split("x") ?? ["640", "480"];
    setCanvas({
      initialized: true,
      width: parseInt(width),
      height: parseInt(height),
    });
    close();
  };

  return (
    <div className="h-full flex gap-16 items-center justify-center">
      <FileButton onChange={setFile} accept="image/png,image/jpeg">
        {(props) => <Button {...props}>Upload File</Button>}
      </FileButton>
      <div className="w-[2px] h-48 bg-slate-200 flex items-center justify-center">
        <span className="p-2 bg-slate-500 text-slate-100">or</span>
      </div>
      <Button onClick={open}>Create Blank Image</Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Create Blank Image"
        centered
      >
        <Select
          label="Select Image Size"
          placeholder="Pick size"
          defaultValue="640x480"
          allowDeselect={false}
          data={["640x480", "1024x768", "1280x1024", "1680x1050"]}
          value={value}
          onChange={setValue}
        />

        <Group justify="flex-end" className="mt-4">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button onClick={handleCreateImage}>Create Image</Button>
        </Group>
      </Modal>
    </div>
  );
}