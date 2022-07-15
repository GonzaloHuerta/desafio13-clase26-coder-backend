import passport from 'passport';
import { Strategy } from 'passport-local';
import { usuariosDao } from '../daos/index.js';
import {UsuariosDaoMongoDb} from '../daos/usuarios/UsuariosDaoMongoDb.js';

const localStrategy = Strategy;

passport.use('register', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async(req, email, password, done)=>{
    const usuarioDb = await usuariosDao.getByEmail(email);
    if(usuarioDb){
        return done(null, false);
    }

    const nuevoUsuario = new UsuariosDaoMongoDb();
    const obj = {
        email: email,
        password: password
    }
    nuevoUsuario.email = email;
    nuevoUsuario.password = password;
    await nuevoUsuario.create(obj);
    done(null, nuevoUsuario);
}))

passport.serializeUser((usuario, done)=>{
    console.log(usuario)
    done(null, usuario.id);
})

passport.deserializeUser(async(id, done)=>{
    const usuario = await usuariosDao.getById(id);
    done(null, usuario);
})

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async(req, email, password, done)=>{
    const usuarioDb = await usuariosDao.findByEmail(email);
    console.log(usuarioDb);
    if(!usuarioDb){
        return done(null, false);
    }
    return done(null, usuarioDb);
}))


