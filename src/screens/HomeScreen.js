import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import api from '../services/api';
import TarefaCard from '../components/TarefaCard';
import TarefaModal from '../components/TarefaModal';
import { COLORS } from '../styles/theme';

export default function HomeScreen() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [savingLoading, setSavingLoading] = useState(false);
  const [filtro, setFiltro] = useState('todas'); // 'todas' | 'pendentes' | 'concluidas'

  //  Carrega tarefas 
  const carregar = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      const data = await api.listar();
      setTarefas(data);
    } catch (e) {
      Alert.alert('Erro de conexão', 'Não foi possível carregar as tarefas.\nVerifique se o servidor está rodando.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  //  Filtragem
  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === 'pendentes') return !t.concluida;
    if (filtro === 'concluidas') return t.concluida;
    return true;
  });

  const concluidasCount = tarefas.filter((t) => t.concluida).length;
  const pendentesCount = tarefas.filter((t) => !t.concluida).length;

  // CRUD 
  function abrirCriar() {
    setTarefaSelecionada(null);
    setModalVisible(true);
  }

  function abrirEditar(tarefa) {
    setTarefaSelecionada(tarefa);
    setModalVisible(true);
  }

  async function salvar(dados) {
    setSavingLoading(true);
    try {
      if (tarefaSelecionada) {
        const atualizada = await api.atualizar(tarefaSelecionada.id, dados);
        setTarefas((prev) => prev.map((t) => (t.id === atualizada.id ? atualizada : t)));
      } else {
        const nova = await api.criar(dados);
        setTarefas((prev) => [nova, ...prev]);
      }
      setModalVisible(false);
    } catch (e) {
      Alert.alert('Erro', e.message);
    } finally {
      setSavingLoading(false);
    }
  }

  async function excluir(id) {
    Alert.alert(
      'Excluir tarefa',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.excluir(id);
              setTarefas((prev) => prev.filter((t) => t.id !== id));
            } catch (e) {
              Alert.alert('Erro', e.message);
            }
          },
        },
      ]
    );
  }

  async function toggleConcluida(tarefa) {
    try {
      const atualizada = await api.atualizar(tarefa.id, {
        ...tarefa,
        concluida: !tarefa.concluida,
      });
      setTarefas((prev) => prev.map((t) => (t.id === atualizada.id ? atualizada : t)));
    } catch (e) {
      Alert.alert('Erro', e.message);
    }
  }

  //Render 
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>📋 Minhas Tarefas</Text>
          <Text style={styles.headerSub}>
            {pendentesCount} pendente{pendentesCount !== 1 ? 's' : ''} · {concluidasCount} concluída{concluidasCount !== 1 ? 's' : ''}
          </Text>
        </View>
        <TouchableOpacity style={styles.btnAdd} onPress={abrirCriar} activeOpacity={0.85}>
          <Text style={styles.btnAddText}>＋</Text>
        </TouchableOpacity>
      </View>

      {/* Filtros */}
      <View style={styles.filtros}>
        {['todas', 'pendentes', 'concluidas'].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.chip, filtro === f && styles.chipAtivo]}
            onPress={() => setFiltro(f)}
            activeOpacity={0.8}
          >
            <Text style={[styles.chipText, filtro === f && styles.chipTextoAtivo]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Carregando tarefas...</Text>
        </View>
      ) : tarefasFiltradas.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyEmoji}>
            {filtro === 'concluidas' ? '🏆' : '✨'}
          </Text>
          <Text style={styles.emptyTitle}>
            {filtro === 'concluidas' ? 'Nenhuma concluída ainda' : 'Tudo limpo por aqui!'}
          </Text>
          <Text style={styles.emptyText}>
            {filtro === 'todas' || filtro === 'pendentes'
              ? 'Toque em ＋ para adicionar uma tarefa'
              : 'Complete algumas tarefas para vê-las aqui'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={tarefasFiltradas}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TarefaCard
              tarefa={item}
              onEdit={abrirEditar}
              onDelete={excluir}
              onToggle={toggleConcluida}
            />
          )}
          contentContainerStyle={styles.lista}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => carregar(true)}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
        />
      )}

      {/* Modal criar/editar */}
      <TarefaModal
        visible={modalVisible}
        tarefa={tarefaSelecionada}
        onSave={salvar}
        onClose={() => setModalVisible(false)}
        loading={savingLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.3,
  },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 3,
    fontWeight: '500',
  },
  btnAdd: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAddText: {
    color: '#fff',
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '300',
  },
  filtros: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  chipAtivo: {
    backgroundColor: '#fff',
  },
  chipText: {
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
    fontSize: 13,
  },
  chipTextoAtivo: {
    color: COLORS.primary,
  },
  lista: {
    paddingTop: 12,
    paddingBottom: 32,
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },
  center: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 12,
    color: COLORS.textLight,
    fontSize: 15,
  },
  emptyEmoji: {
    fontSize: 52,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
});
