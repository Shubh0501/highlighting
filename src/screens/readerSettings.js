import React, {useRef, useEffect} from 'react';
import {
  View,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

export default function ReaderSettings({
  font_size = 12,
  onClickFontIcon,
  background_color = 'light',
  change_background_color,
  bookId = null,
  hidden = false,
  nav = null,
  ScrollInitialized = true,
  currentPage = 1,
  totalPages = 1,
  title = '',
  author = '',
  chapters = [],
}) {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (hidden) {
      Animated.timing(slideAnim, {
        toValue: -400,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else if (!ScrollInitialized) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [hidden, ScrollInitialized]);

  const onClickFont = () => {
    onClickFontIcon(true);
  };

  return (
    <Animated.View
      style={[
        {
          textAlignVertical: 'center',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          paddingLeft: 4,
          paddingRight: 4,
          paddingTop: 5,
          paddingBottom: 10,
          backgroundColor: '#FFFFFF',
        },
        {
          transform: [
            {
              translateY: slideAnim,
            },
          ],
          zIndex: 10,
          position: 'absolute',
          top: 0,
          flexDirection: 'column',
          minWidth: '100%',
        },
      ]}>
      <View
        style={[
          {
            textAlignVertical: 'center',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 5,
            paddingBottom: 10,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            maxWidth: '45%',
            marginRight: 'auto',
          }}></View>
        <View style={{flexDirection: 'row'}}></View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2%',
        }}>
        <View style={[{width: '95%'}]} />
      </View>
      <View style={[{margin: '4%'}]}>
        <View style={[]}>
          <Text style={[]}>{title}</Text>
        </View>
        <View style={[{marginTop: '2%'}]}>
          <Text style={[]}>{author}</Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2%',
        }}>
        <View style={[{width: '95%'}]} />
      </View>
    </Animated.View>
  );
}
