import fs from 'fs';
import path from 'path';

var copydir = function( src, dst ){
    // 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }
  
        paths.forEach(function( path ){
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;      
  
            stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }

                // 判断是否为文件
                if( st.isFile() ){
                    // 创建读取流
                    readable = fs.createReadStream( _src );
                    // 创建写入流
                    writable = fs.createWriteStream( _dst );
                    // 通过管道来传输流
                    readable.pipe( writable );
                }
                // 如果是目录则递归调用自身
                else if( st.isDirectory() ){
                    exists( _src, _dst, copy );
                }
            });
        });
    });
};

var copy = function( src, dst, name ){
  // 创建读取流
  let readable = fs.createReadStream( src );
  // 创建写入流
  let writable = fs.createWriteStream( dst + (name ? ('/' + name) : ''));
  // 通过管道来传输流
  readable.pipe( writable );
};

// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, name, callback ){
    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
          callback( src, dst, name );
        }
        // 不存在
        else{
          mkdirs( path.dirname(dst), function(){
            callback( src, dst, name );
          });
        }
    });
};

var mkdirsSync = function(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
var mkdirs = function(dirname, callback) {  
    fs.exists(dirname, function (exists) {  
        if (exists) {  
            callback();  
        } else {  
            // console.log(path.dirname(dirname));  
            mkdirs(path.dirname(dirname), function () {  
                fs.mkdir(dirname, callback);  
            });  
        }  
    });  
}  

export function cpfile(file, cpfile, name) {
  exists( file, cpfile, name, copy );
}
;
