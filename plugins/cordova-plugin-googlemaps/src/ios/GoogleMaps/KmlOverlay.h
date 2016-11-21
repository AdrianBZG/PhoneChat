//
//  GroundOverlay.h
//  SimpleMap
//
//  Created by Katsumata Masashi on 12/4/13.
//
//

#import "GoogleMaps.h"
#import "MyPlgunProtocol.h"
#import "PluginUtil.h"
#import "TBXML.h"
#import "MyPlgunProtocol.h"

@interface KmlOverlay : CDVPlugin<MyPlgunProtocol>

@property (nonatomic, strong) GoogleMapsViewController* mapCtrl;
@property (nonatomic, strong) NSString* kmlId;
@property (nonatomic, strong) UIView* _loadingView;
@property (nonatomic, strong) UIActivityIndicatorView *spinner;

- (void)createKmlOverlay:(CDVInvokedUrlCommand*)command;


@end
