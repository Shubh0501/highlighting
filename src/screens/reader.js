import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  Animated,
  ScrollView,
  Image,
} from 'react-native';
import ImageComponent from './imageComponent';
import ReaderSettings from './readerSettings';

function BookReader(props) {
  const [fontSize, setFontSize] = useState(14);
  const [background, changebackground] = useState('light');
  const [settingHidden, setSettingHidden] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [scrollInitialized, setScrollInitialized] = useState(false);
  const [currentPage, setCurrentPage] = useState(3);
  const [maximumPages, setMaximumPages] = useState(6);
  const [data, setData] = useState([
    {
      pageNo: 1,
      textAndImages: [
        {
          id: 1,
          type: 'Image',
          displayMode: 'newline',
          link: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F87%2Ff5%2Ff4%2F87f5f4d0dc71f4ead35e7b5bc35a2af8.jpg&f=1&nofb=1&ipt=bece86bea91609327414955d72efc0c652118ba7f724b9ae7edf4dd6cd282697&ipo=images',
          height: 490,
          width: 735,
        },
      ],
    },
    {
      pageNo: 2,
      textAndImages: [
        {
          id: 1,
          type: 'text',
          displayMode: 'newline',
          data: "What is Lorem Ipsum?\n\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
    },
    {
      pageNo: 3,
      textAndImages: [
        {
          id: 1,
          type: 'text',
          displayMode: 'inline',
          data: " What is Lorem Ipsum?\n\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
    },
    {
      pageNo: 4,
      textAndImages: [
        {
          id: 1,
          type: 'text',
          displayMode: 'newline',
          data: "What is Lorem Ipsum?\n\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          id: 2,
          type: 'text',
          displayMode: 'inline',
          data: 'Where does it come from?\n\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        },
        {
          id: 3,
          type: 'text',
          displayMode: 'newline',
          data: 'Where does it come from?\n\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        },
        {
          id: 4,
          type: 'text',
          displayMode: 'newline',
          data: 'Where does it come from?\n\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        },
        {
          id: 5,
          type: 'text',
          displayMode: 'newline',
          data: 'Where does it come from?\n\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        },
      ],
    },
    {
      pageNo: 5,
      textAndImages: [
        {
          id: 1,
          type: 'text',
          displayMode: 'newline',
          data: "What is Lorem Ipsum?\n\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
    },
    {
      pageNo: 6,
      textAndImages: [
        {
          id: 1,
          type: 'text',
          displayMode: 'newline',
          data: "What is Lorem Ipsum?\n\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          id: 2,
          type: 'text',
          displayMode: 'inline',
          data: ' Where does it come from?\n\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\nWhere does it come from?\n\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        },
        {
          id: 3,
          type: 'text',
          displayMode: 'newline',
          data: 'Where does it come from?\n\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\nWhere does it come from?\n\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        },
      ],
    },
  ]);

  const listPositionRef = useRef();
  const scrollRef = useRef(0);
  const pageNumberContainerSlideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    if (scrollDirection === 'up') {
      if (!settingHidden && scrollRef.current > 0) {
        setSettingHidden(true);
      }
    }
  }, [scrollDirection]);

  useEffect(() => {
    if (settingHidden) {
      Animated.timing(pageNumberContainerSlideAnim, {
        toValue: 400,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else if (!scrollInitialized) {
      Animated.timing(pageNumberContainerSlideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [settingHidden, scrollInitialized]);

  const renderContents = (item_array, pageNo) => {
    if (!item_array || item_array.length === 0) {
      return (
        <Text style={{width: Dimensions.get('window').width * 0.9}}>
          {'\n'}
        </Text>
      );
    } else {
      return (
        <Text
          selectable={true}
          style={[
            {textAlign: 'left', fontSize: fontSize},
            {
              marginBottom:
                pageNo === maximumPages && Platform.OS === 'ios' ? 20 : 0,
            },
          ]}>
          {item_array.map((item, i) => {
            if (item.empty) {
              return (
                <Text
                  key={item.id}
                  style={[{width: Dimensions.get('window').width * 0.9}]}>
                  {'\n'}
                </Text>
              );
            } else if (item.type === 'Image') {
              var height = Number(item.height);
              var width = Number(item.width);
              var percentFill = 0.5;
              const w_height = Dimensions.get('window').height;
              const w_width = Dimensions.get('window').width;
              const min_dim = Math.min(w_height, w_width);
              const image_ratio = width ? height / width : 1.5;
              const min_dim_var = min_dim === w_height ? 'h' : 'w';
              const iHeight =
                item.displayMode === 'inline'
                  ? fontSize * 1.2
                  : min_dim_var === 'h'
                  ? w_height / image_ratio <= w_width
                    ? min_dim * percentFill
                    : w_width * percentFill * image_ratio
                  : w_width * image_ratio <= w_height
                  ? min_dim * percentFill * image_ratio
                  : w_height * percentFill;
              const iWidth =
                item.displayMode === 'inline'
                  ? (fontSize * 1.2) / image_ratio
                  : min_dim_var === 'h'
                  ? w_height / image_ratio <= w_width
                    ? (min_dim * percentFill) / image_ratio
                    : w_width * percentFill
                  : w_width * image_ratio <= w_height
                  ? min_dim * percentFill
                  : (w_height * percentFill) / image_ratio;
              return (
                <Text key={item.id}>
                  {item.displayMode === 'inline' ? (
                    <Text key={item.id}>
                      <Image
                        source={{uri: item.link}}
                        style={{height: fontSize + 2, width: fontSize + 2}}
                      />
                    </Text>
                  ) : (
                    <Text>
                      <Text
                        style={[{width: Dimensions.get('window').width * 0.9}]}>
                        {'\n\n'}
                      </Text>
                      <View
                        key={item.id}
                        style={[
                          {
                            width: Dimensions.get('window').width * 0.9,
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        ]}>
                        <ImageComponent
                          link={item.link}
                          height={item.height}
                          width={item.width}
                          displayMode={item.displayMode}
                          fontSize={fontSize}
                          backgroundColor={background}
                          percentFill={0.4}
                        />
                        <Text
                          style={[
                            {width: Dimensions.get('window').width * 0.9},
                          ]}>
                          {'\n'}
                        </Text>
                      </View>
                    </Text>
                  )}
                </Text>
              );
            } else {
              var data = item.data;
              return (
                <Text
                  selectable={true}
                  key={item.id}
                  style={[
                    {
                      textAlign: 'left',
                    },
                  ]}>
                  {item.displayMode === 'inline' ? null : (
                    <Text
                      style={[{width: Dimensions.get('window').width * 0.9}]}>
                      {'\n'}
                    </Text>
                  )}
                  <Text
                    selectable={true}
                    style={[
                      {
                        textAlign: 'left',
                      },
                    ]}>
                    {data}
                  </Text>
                </Text>
              );
            }
          })}
        </Text>
      );
    }
  };
  const MemorizedContents = useCallback(
    textAndImages => {
      return renderContents(textAndImages);
    },
    [fontSize, background],
  );

  const renderItems = index => {
    var item = null;
    if (!data) {
      return <View />;
    }
    for (var i = 0; i < data.length; i++) {
      if (data[i].pageNo === index) {
        item = data[i];
        break;
      }
    }
    if (!item) {
      return <View />;
    } else {
      var pageNo = item.pageNo;
      if (item.isCoverPage) {
        return (
          <View style={[{marginTop: '60%'}]}>
            <ImageComponent
              link={item.link}
              height={item.coverPageHeight}
              width={item.coverPageWidth}
              displayMode="newline"
              backgroundColor={background}
              fontSize={2000}
              percentFill={0.9}
            />
          </View>
        );
      } else {
        return (
          <View style={[]}>
            {MemorizedContents(item.textAndImages, pageNo)}
          </View>
        );
      }
    }
  };

  const MemorizedData = useCallback(
    index => {
      return renderItems(index);
    },
    [fontSize, background, props.bookReaderDocs],
  );

  const keyExtractor = item => {
    return item.pageNo;
  };

  const MemorizedKeyExtractor = useCallback(item => {
    return keyExtractor(item);
  });

  const changeFontModalVisibility = value => {
    setFontModalVisible(value);
  };

  return (
    <>
      <View style={[]}>
        <StatusBar
          barStyle={background === 'dark' ? 'light-content' : 'dark-content'}
          translucent={false}
          hidden={settingHidden}
          showHideTransition="slide"
          backgroundColor={'#FFFFFF'}
        />
        <View
          style={{
            zIndex: 200,
            minHeight: Platform.OS === 'ios' ? 35 : 0,
            backgroundColor: '#FFFFFF',
          }}
        />
        <SafeAreaView>
          <ReaderSettings
            font_size={fontSize}
            onClickFontIcon={changeFontModalVisibility}
            background_color={background}
            change_background_color={changebackground}
            bookId={''}
            hidden={settingHidden}
            ScrollInitialized={scrollInitialized}
            currentPage={currentPage}
            totalPages={maximumPages}
            title={'BOOK READER PAGE'}
            author={'TESTING APPLICATION'}
          />
          <View>
            <ScrollView
              style={{minHeight: '100%'}}
              ref={listPositionRef}
              scrollsToTop={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              overScrollMode="always"
              scrollEventThrottle={10}
              onScroll={eve => {
                const cur_y = eve.nativeEvent.contentOffset.y;
                const prev_y = scrollRef.current;
                if (prev_y <= 15) {
                  if (scrollDirection !== 'down') {
                    setScrollDirection('down');
                  }
                } else if (prev_y <= cur_y) {
                  if (scrollDirection !== 'up') {
                    setScrollDirection('up');
                  }
                  if (scrollInitialized) {
                    setScrollInitialized(false);
                  }
                } else {
                  if (scrollDirection !== 'down') {
                    setScrollDirection('down');
                  }
                  if (scrollInitialized) {
                    setScrollInitialized(false);
                  }
                }
                scrollRef.current = cur_y;
              }}
              onScrollBeginDrag={() => setScrolling(true)}
              onScrollEndDrag={() => setScrolling(false)}
              onTouchEnd={() => {
                if (!scrolling) {
                  setSettingHidden(!settingHidden);
                }
                if (scrollDirection !== 'down') {
                  setScrollDirection('down');
                }
              }}>
              <View>{MemorizedData(currentPage)}</View>
              <View style={{height: 90}} />
            </ScrollView>
          </View>
          <Animated.View
            style={[
              {
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: '10%',
                width: '100%',
              },
              {
                transform: [
                  {
                    translateY: pageNumberContainerSlideAnim,
                  },
                ],
              },
            ]}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '30%',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  paddingVertical: 5,
                },
              ]}>
              <View
                style={[{marginRight: '8%'}]}
                onTouchEnd={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                    listPositionRef.current.scrollTo({
                      x: 0,
                      y: 0,
                      animated: true,
                    });
                  }
                }}>
                <Image
                  source={{
                    uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_430320.png&f=1&nofb=1&ipt=89e68e8ed5b45fc45abf8b5dcf637db2c023221245c15ec3d7f554127693e74f&ipo=images',
                  }}
                  style={[{height: 30, width: 30}]}
                />
              </View>
              <Text style={[]}>{currentPage}</Text>
              <View
                style={[{marginLeft: '8%'}]}
                onTouchEnd={() => {
                  if (currentPage < maximumPages) {
                    setCurrentPage(currentPage + 1);
                    listPositionRef.current.scrollTo({
                      x: 0,
                      y: 0,
                      animated: true,
                    });
                  }
                }}>
                <Image
                  source={{
                    uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_276831.png&f=1&nofb=1&ipt=87becf680a08bdb71299d83539ba4b383c0d442f9b92adb6a956e59ea7cffdb3&ipo=images',
                  }}
                  style={[{height: 30, width: 30}]}
                />
              </View>
            </View>
          </Animated.View>
        </SafeAreaView>
      </View>
    </>
  );
}

export default BookReader;
