import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default (Comp: ReactClass<*>) => {
  return ({ spinner, children, ...props }: Object) => (
    <View style={{ flex: 1 }}>
      <Comp {...props}>
        {children}
      </Comp>
      {spinner &&
        <View
          style={[
            StyleSheet.absoluteFill,
            { flex:1, backgroundColor: 'rgba(0, 0, 0, 0.25)', justifyContent: 'center' }
          ]}
        >
          <ActivityIndicator size="large" />
        </View>}
    </View>
  );
};
