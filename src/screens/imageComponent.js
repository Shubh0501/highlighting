import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';

export default ImageObject = props => {
  const {link, height, width, displayMode, fontSize, percentFill} = props;
  const w_height = Dimensions.get('window').height;
  const w_width = Dimensions.get('window').width;
  const min_dim = Math.min(w_height, w_width);
  const image_ratio = width ? height / width : 1.5;
  const min_dim_var = min_dim === w_height ? 'h' : 'w';
  const [state, setState] = useState({
    isLoading: false,
    errorLoading: false,
    height: displayMode === 'inline' ? fontSize * 1.2 : min_dim * percentFill,
    width:
      displayMode === 'inline'
        ? (fontSize * 1.2) / image_ratio
        : (min_dim * percentFill) / image_ratio,
    cHeight: displayMode === 'inline' ? fontSize * 1.2 : min_dim * percentFill,
    cWidth:
      displayMode === 'inline'
        ? (fontSize * 1.2) / image_ratio
        : (min_dim * percentFill) / image_ratio,
    iHeight:
      displayMode === 'inline'
        ? fontSize * 1.2
        : min_dim_var === 'h'
        ? w_height / image_ratio <= w_width
          ? min_dim * percentFill
          : w_width * percentFill * image_ratio
        : w_width * image_ratio <= w_height
        ? min_dim * percentFill * image_ratio
        : w_height * percentFill,
    iWidth:
      displayMode === 'inline'
        ? (fontSize * 1.2) / image_ratio
        : min_dim_var === 'h'
        ? w_height / image_ratio <= w_width
          ? (min_dim * percentFill) / image_ratio
          : w_width * percentFill
        : w_width * image_ratio <= w_height
        ? min_dim * percentFill
        : (w_height * percentFill) / image_ratio,
  });

  return (
    <View style={[{minHeight: state.iHeight, minWidth: state.iWidth}]}>
      {state.isLoading ? <Loader /> : null}
      {state.errorLoading ? (
        displayMode === 'inline' ? (
          <Text>Er.IMG</Text>
        ) : (
          <Text>Error Loading the image!</Text>
        )
      ) : null}
      <FastImage
        source={{uri: link}}
        style={{minHeight: state.iHeight, minWidth: state.iWidth}}
        onError={() => {
          setState({...state, isLoading: false, errorLoading: true});
        }}
        onLoadStart={() => {
          setState({...state, isLoading: true});
        }}
        onLoad={() => {
          setState({...state, isLoading: false, errorLoading: false});
        }}
      />
    </View>
  );
};
