import React, { useEffect, useState } from 'react';
import {
  Box,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Select,
  Heading,
  StackDivider,
  Input,
  Text,
  Image,
  FormControl,
  Button,
} from '@chakra-ui/react';
import css from './CelebritySelection.module.css';

export type CelebritySelectionProps = {
  onClick: () => void;
  setName: (value: React.SetStateAction<string>) => void;
  celebrityName: string;
};

const CelebritySelection = ({
  onClick,
  setName,
  celebrityName,
}: CelebritySelectionProps) => {
  const [input, setInput] = useState('');
  const [isEnterEnabled, setIsEnterEnabled] = useState(false);
  const handleInputChange = (e: any) => setInput(e.target.value);
  const handleCelebritySelection = (e: any) => setName(e.target.value);

  useEffect(() => {
    const shouldEnter = input.length > 1 && Boolean(celebrityName.length);
    setIsEnterEnabled(shouldEnter);
  }, [input, celebrityName]);

  return (
    <Card width={600} className={css.CelebritySelectionCard}>
      <CardHeader>
        <Image
          src="/celebrity-chat-card.jpg"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Heading size="md" pt="3">
          The Ultimate Celebrity Interactive Experience
        </Heading>
        <Text fontSize="xl">
          The show where dreams come true! Tonight, get ready to immerse
          yourself in an extraordinary event where you can personally connect
          and converse with your beloved celebrities.
        </Text>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Select
              placeholder="Select celebrity"
              onChange={handleCelebritySelection}
              required
            >
              <option value="Johny Depp">Johny Depp</option>
              <option value="Barack Obama">Barack Obama</option>
            </Select>
          </Box>
          <Box>
            <FormControl>
              <Heading pb="2" fontSize="sm" size="xs" textTransform="uppercase">
                Enter your name
              </Heading>
              <Input
                type="name"
                value={input}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            {isEnterEnabled && (
              <Button
                colorScheme="teal"
                variant="outline"
                mt="4"
                onClick={onClick}
              >
                Enter
              </Button>
            )}
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CelebritySelection;
