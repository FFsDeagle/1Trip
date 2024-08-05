import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ExternalLink } from '../ExternalLink';
import { MonoText } from '../StyledText';
import { TextPrimary, SecondaryView } from '../Themed';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <SecondaryView>
      <View style={styles.getStartedContainer}>
        <TextPrimary
          style={styles.getStartedText}>
          Open up the code for this screen:
        </TextPrimary>

        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
>
          <MonoText>{path}</MonoText>
        </View>

        <TextPrimary
          style={styles.getStartedText}
          >
          Change any of the text, save the file, and your app will automatically update.
        </TextPrimary>
      </View>

      <View style={styles.helpContainer}>
        <ExternalLink
          style={styles.helpLink}
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet">
          <TextPrimary style={styles.helpLinkText}>
            Tap here if your app doesn't automatically update after making changes
          </TextPrimary>
        </ExternalLink>
      </View>
    </SecondaryView>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
